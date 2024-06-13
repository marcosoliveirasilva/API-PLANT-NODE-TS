import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IDoenca } from "../../database/models";
import { doencas } from "../../database/providers/";

interface IBodyProps extends Omit<IDoenca, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    nomeCientifico: yup.string().required().min(3),
    sobre: yup.string().required().min(3).max(750),
    fonte: yup.string().required().min(3).max(750),
  })),
}));

export const create = async (req: Request<{}, {}, IDoenca>, res: Response) => {
  const result = await doencas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
