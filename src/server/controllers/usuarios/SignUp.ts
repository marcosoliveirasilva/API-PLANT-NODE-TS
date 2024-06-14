import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { usuarios } from '../../database/providers';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';


interface IBodyProps extends Omit<IUsuario, 'id' | 'created_at' | 'updated_at'> { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    pessoaID: yup.number().required(),
    nome: yup.string().required().min(3),
    senha: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  console.log(req.body)
  const result = await usuarios.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
