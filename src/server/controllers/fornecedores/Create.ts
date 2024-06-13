import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IFornecedor } from "../../database/models";
import { fornecedores } from "../../database/providers/";

interface IBodyProps extends Omit<IFornecedor, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    pessoaID: yup.number().required(),
    nomeEmpresa: yup.string().required().min(3),
    nomeFantasia: yup.string().required().min(3),
    cnpj: yup.string().required().length(14),
    urlSite: yup.string().required().url(),
    email: yup.string().required().email(),
    telefoneCelular: yup.string().required().length(11),
    telefoneFixo: yup.string().optional().length(10),
    endereco: yup.string().required().min(3),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IFornecedor>, res: Response) => {
  const result = await fornecedores.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        desfault: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
}
