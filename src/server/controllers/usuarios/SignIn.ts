import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { usuarios } from '../../database/providers';
import { JWTService, PasswordCrypito } from '../../shared/services';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';

import { pessoas } from "../../database/providers";


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'  | 'pessoaID' | 'created_at' | 'updated_at'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    senha: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;


  const usuario = await usuarios.Provider.getByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  }

  const passwordMatch = await PasswordCrypito.verifyPassword(senha, usuario.senha);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  } else {
    const accessToken = JWTService.sing({ uid: usuario.id });

    if ( accessToken === 'JWT_SECRET_NOT_FOUND' ) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    const resultPerson = await pessoas.Provider.getById(usuario.pessoaID);
    const response = {
      ...resultPerson,
      accessToken: accessToken
    };

    return res.status(StatusCodes.OK).json(response);
  }
};
