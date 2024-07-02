import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { historicoScanns, pessoas, usuarios } from "../../database/providers";

import { extractUidFromToken } from '../../shared/services';
import { IHistoricoScann } from "../../database/models";

interface IQueryProps {
  distance?: number;
  diagnosticID?: number;
  page?: number;
  limit?: number;
}

const calc = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}

export const getMarker = async (req: Request<object, object, object, IQueryProps>, res: Response) => {
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

  const result = await historicoScanns.Provider.getMarker(
    req.query.page || 1,
    req.query.limit || 7,
    userID,
    Number(req.query.diagnosticID)
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
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

  const resultPerson = await pessoas.Provider.getById(resultUser.pessoaID);

  if (resultPerson instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: resultPerson.message
      }
    });
  }

  let resultMarker: IHistoricoScann[] = []
  if(isNaN(Number(req.query.distance))){
    resultMarker = result;
  } else {
    for (const item of result) {
      if ((calc(Number(resultPerson.latitude), Number(resultPerson.longitude), Number(item.latitude), Number(item.longitude))) < Number(req.query.distance)) {
        resultMarker.push(item);
      }
    }
  }

  return res.status(StatusCodes.OK).json(resultMarker);
}
