import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IProduto } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { produtos } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<IProduto, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    fornecedorID: yup.number().required(),
    nomeProduto: yup.string().required().min(3),
    tipoProduto: yup.string().required().min(3),
    descricao: yup.string().required().min(3),
    urlProduto: yup.string().required().url(),
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado!'
      }
    });
  }

  const result = await produtos.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
}
