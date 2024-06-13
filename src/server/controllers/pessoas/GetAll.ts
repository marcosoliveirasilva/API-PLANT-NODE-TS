import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { pessoas } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  name?: string;
  cpf?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    name: yup.string().optional(),
    cpf: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await pessoas.Provider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.name || '',
    req.query.cpf || '',
    Number(req.query.id)
  );
  const count = await pessoas.Provider.count(req.query.name, req.query.cpf);

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
