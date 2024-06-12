import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";

interface IPlanta {
  nome: String;
  nome_cientifico: String;
};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IPlanta>(yup.object().shape({
    nome: yup.string().required().min(3),
    nome_cientifico: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, IPlanta>, res: Response) => {


  return res.status(StatusCodes.CREATED).json(1);
}
