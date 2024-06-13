import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IPessoa } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { pessoas } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<IPessoa, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    cpf: yup.string().required().min(11).max(11),
    email: yup.string().required().min(10),
    telefoneCelular: yup.string().required().min(11).max(11),
    telefoneFixo: yup.string().optional().min(10).max(10),
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

  const result = await pessoas.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
}
