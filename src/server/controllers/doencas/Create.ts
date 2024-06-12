import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";

interface IDoenca {
  nome: String;
  nome_cientifico: String;
  sobre: String;
  fonte: String;
};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IDoenca>(yup.object().shape({
    nome: yup.string().required().min(3),
    nome_cientifico: yup.string().required().min(3),
    sobre: yup.string().required().min(3),
    fonte: yup.string().required().url(),
  })),
}));

export const create = async (req: Request<{}, {}, IDoenca>, res: Response) => {


  return res.status(StatusCodes.CREATED).json(1);
}
