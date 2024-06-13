import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IPlanta } from "../../database/models";
import { PlantasProvider } from "../../database/providers/plantas";

interface IBodyProps extends Omit<IPlanta, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(250),
    nome_cientifico: yup.string().required().min(3).max(250),
  })),
}));

export const create = async (req: Request<{}, {}, IPlanta>, res: Response) => {
  const result = await PlantasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
