import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { fornecedores } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  personId?: number;
  name?: string;
  cnpj?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    personId: yup.number().optional(),
    name: yup.string().optional(),
    cnpj: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await fornecedores.Provider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.personId || 0,
    req.query.name || '',
    req.query.cnpj || '',
    Number(req.query.id)
  );
  const count = await fornecedores.Provider.count(req.query.personId, req.query.name, req.query.cnpj);

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
