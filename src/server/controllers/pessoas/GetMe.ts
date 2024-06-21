import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { pessoas } from "../../database/providers";
import { usuarios } from '../../database/providers';

import { extractUidFromToken } from '../../shared/services';

export const getMe = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Token não fornecido'
      }
    });
  }

  const uid = extractUidFromToken(accessToken);

  if (!uid){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Token inválido'
      }
    });
  }

  const userID = Number(uid);


  if (isNaN(userID)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'UID inválido'
      }
    });
  }

  const resultUser = await usuarios.Provider.getById(userID);

  if (resultUser instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: resultUser.message
      }
    });
  }

  const result = await pessoas.Provider.getById(resultUser.pessoaID);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
}
