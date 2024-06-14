import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { historicoScanns } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  personID?: number;
  diagnosticID?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    personID: yup.number().optional(),
    diagnosticID: yup.number().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await historicoScanns.Provider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.personID || 0,
    req.query.diagnosticID || 0,
    Number(req.query.id)
  );
  const count = await historicoScanns.Provider.count(req.query.personID, req.query.diagnosticID);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
}