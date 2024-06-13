import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IDiagnostico } from "../../database/models";
import { diagnosticos } from "../../database/providers/";

interface IBodyProps extends Omit<IDiagnostico, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    doencaID: yup.number().required(),
    plantaID: yup.number().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IDiagnostico>, res: Response) => {
  const result = await diagnosticos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
