import * as tf from '@tensorflow/tfjs-node';

const loadModel = async () => {
  const modelPath = 'file://./best_model_classifier/model.json';

  // Carregar o modelo
  const model = await tf.loadLayersModel(modelPath);
  return model;
};

export { loadModel };
