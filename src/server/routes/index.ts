import { Router } from "express";
import { doencas, plantas } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá');
});

router.get('/doencas', doencas.DoencaController.getAllValidation, doencas.DoencaController.getAll);
router.get('/doencas/:id', doencas.DoencaController.getByIdValidation, doencas.DoencaController.getById);
router.post('/doencas', doencas.DoencaController.createValidation, doencas.DoencaController.create);
router.put('/doencas/:id', doencas.DoencaController.updateByIdValidation, doencas.DoencaController.updateById);
router.delete('/doencas/:id', doencas.DoencaController.deleteByIdValidation, doencas.DoencaController.deleteById);

router.get('/plantas', plantas.PlantaController.getAllValidation, plantas.PlantaController.getAll);
router.get('/plantas/:id', plantas.PlantaController.getByIdValidation, plantas.PlantaController.getById);
router.post('/plantas', plantas.PlantaController.createValidation, plantas.PlantaController.create);
router.put('/plantas/:id', plantas.PlantaController.updateByIdValidation, plantas.PlantaController.updateById);
router.delete('/plantas/:id', plantas.PlantaController.deleteByIdValidation, plantas.PlantaController.deleteById);

export  { router };
