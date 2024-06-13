import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IFornecedor } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { fornecedores } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<IFornecedor, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    pessoaID: yup.number().required(),
    nomeEmpresa: yup.string().required().min(3),
    nomeFantasia: yup.string().required().min(3),
    cnpj: yup.string().required().length(14),
    urlSite: yup.string().required().url(),
    email: yup.string().required().email(),
    telefoneCelular: yup.string().required().length(11),
    telefoneFixo: yup.string().optional().length(10),
    endereco: yup.string().required().min(3),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
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

  const result = await fornecedores.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
}
