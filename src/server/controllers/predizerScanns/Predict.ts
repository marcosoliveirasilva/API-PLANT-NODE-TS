import { Request, Response } from 'express';
import { loadModel } from '../../database/providers/predizerScann/PredictImage';
import * as tf from '@tensorflow/tfjs-node';
import Jimp from 'jimp';
import { StatusCodes } from 'http-status-codes';

import { diagnosticos, pessoas, usuarios } from '../../database/providers';
import { historicoScanns } from "../../database/providers/";
import { extractUidFromToken } from '../../shared/services';

interface PredictRequest extends Request {
  file: {
    buffer: Buffer;
  };
}

/*const CLASS_NAMES = ["Cereja Oídio", "Maçã Ferrugem", "Maçã Podridão Negra", "Maçã Sarna", "Morango Queimadura Na Folha",
  "Uva Mancha Isariopsis", "Uva Podridão Negra", "Uva Sarampo Negro (Esca)"];*/
const CLASS_ID = [1, 2, 3, 4, 5, 6, 7, 8];

let model: tf.LayersModel;

(async () => {
  model = await loadModel();
})();

export const predict = async (req: PredictRequest, res: Response) => {
  try {
    const imageBuffer = req.file.buffer;
    const image = await Jimp.read(imageBuffer);
    image.resize(256, 256).normalize();

    const imageTensor = tf.tidy(() => {
      const buffer = image.bitmap.data;
      const imgTensor = tf.tensor3d(new Uint8Array(buffer), [image.bitmap.height, image.bitmap.width, 4]);
      const resized = imgTensor.slice([0, 0, 0], [256, 256, 3]).div(tf.scalar(255));
      return resized.expandDims(0);
    });

    const predictions = model.predict(imageTensor) as tf.Tensor;
    //const predictedClass = CLASS_NAMES[predictions.argMax(1).dataSync()[0]];
    //const confidence = Math.max(...predictions.dataSync());

    const predictedClassId = CLASS_ID[predictions.argMax(1).dataSync()[0]];

    const resultDiagnostic = await diagnosticos.Provider.getById(predictedClassId);
    if (resultDiagnostic instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: resultDiagnostic.message
        }
      });
    }

    //Obter Id Usuário
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

    //Obter Usuário
    const resultUser = await usuarios.Provider.getById(userID);

    if (resultUser instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: resultUser.message
        }
      });
    }

    //Obter Pessoa
    const resultPerson = await pessoas.Provider.getById(resultUser.pessoaID);

    if (resultPerson instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: resultPerson.message
        }
      });
    }

    //Registrar Histórico
    const reqHistoricoScanns = {
      'usuarioID': userID,
      'diagnosticoID': predictedClassId,
      'latitude': resultPerson.latitude,
      'longitude': resultPerson.longitude
    }

    const resultCreate = await historicoScanns.Provider.create(reqHistoricoScanns);

    if (resultCreate instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          desfault: resultCreate.message
        }
      });
    }

    //Retornar Predição
    res.status(StatusCodes.OK).json(resultDiagnostic);
    //res.json({ class: predictedClass, confidence });
  } catch (error) {
    console.error("Error during processing:", error);
    res.status(500).json({
      errors: {
        desfault: "Erro durante o processamento do arquivo"
      }
    });
  }
};
