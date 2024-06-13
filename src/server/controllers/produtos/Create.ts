import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IProduto } from "../../database/models";
import { produtos } from "../../database/providers/";

interface IBodyProps extends Omit<IProduto, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    fornecedorID: yup.number().required(),
    nomeProduto: yup.string().required().min(3),
    descricao: yup.string().required().min(3),
    urlProduto: yup.string().required().url(),
  })),
}));

export const create = async (req: Request<{}, {}, IProduto>, res: Response) => {
  const result = await produtos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
