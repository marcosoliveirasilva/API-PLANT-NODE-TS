import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IHistoricoScann } from "../../database/models";
import { historicoScanns } from "../../database/providers/";

interface IBodyProps extends Omit<IHistoricoScann, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    pessoaID: yup.number().required(),
    diagnosticoID: yup.number().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IHistoricoScann>, res: Response) => {
  const result = await historicoScanns.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
