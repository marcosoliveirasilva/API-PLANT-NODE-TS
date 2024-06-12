import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
};

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {


  return res.send(req.params);
}
