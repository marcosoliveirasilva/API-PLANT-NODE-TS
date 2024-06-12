import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';

interface IParamsProps {
  id?: number;
};

interface IBodyProps {
  nome?: String;
  nome_cientifico?: String;
};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().optional().min(3),
    nome_cientifico: yup.string().optional().min(3),
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {


  return res.send(req.params);
}
