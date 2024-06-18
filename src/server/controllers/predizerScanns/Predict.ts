import { Request, Response } from 'express';
import { loadModel } from '../../database/providers/predizerScann/PredictImage';
import * as tf from '@tensorflow/tfjs-node';
import Jimp from 'jimp';

interface PredictRequest extends Request {
  file: {
    buffer: Buffer;
  };
}

const CLASS_NAMES = ["Cereja Oídio", "Maçã Ferrugem", "Maçã Podridão Negra", "Maçã Sarna", "Morango Queimadura Na Folha",
  "Uva Mancha Isariopsis", "Uva Podridão Negra", "Uva Sarampo Negro (Esca)"];

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
    const predictedClass = CLASS_NAMES[predictions.argMax(1).dataSync()[0]];
    const confidence = Math.max(...predictions.dataSync());

    res.json({ class: predictedClass, confidence });
  } catch (error) {
    console.error("Error during processing:", error);
    res.status(500).json({ error: "Error during file processing" });
  }
};
