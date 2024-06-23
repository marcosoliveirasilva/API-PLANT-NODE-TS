import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { pessoas } from "../../database/providers/";

interface IBodyProps extends Omit<IPessoa, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    cpf: yup.string().required().length(11),
    telefoneCelular: yup.string().required().length(11),
    telefoneFixo: yup.string().optional().length(10),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
  const result = await pessoas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
