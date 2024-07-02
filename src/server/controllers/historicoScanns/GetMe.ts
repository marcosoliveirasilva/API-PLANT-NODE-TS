import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { historicoScanns } from "../../database/providers";

import { extractUidFromToken } from '../../shared/services';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
}

export const getMe = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
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

  const result = await historicoScanns.Provider.getMe(
    req.query.page || 1,
    req.query.limit || 7,
    userID,
    Number(req.query.id)
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
}
