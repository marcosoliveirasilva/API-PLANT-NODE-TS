import { Router } from "express";
import { DoencaController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {

  return res.send('Olá');
});

router.get('/doencas', DoencaController.getAllValidation, DoencaController.getAll);
router.get('/doencas/:id', DoencaController.getByIdValidation, DoencaController.getById);
router.post('/doencas', DoencaController.createValidation, DoencaController.create);
router.put('/doencas/:id', DoencaController.updateByIdValidation, DoencaController.updateById);
router.delete('/doencas/:id', DoencaController.deleteByIdValidation, DoencaController.deleteById);

export  { router };
