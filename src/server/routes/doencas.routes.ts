import { Router } from "express";
import { doencas } from './../controllers';

const router = Router();

router.get('/', doencas.Controller.getAllValidation, doencas.Controller.getAll);
router.get('/:id', doencas.Controller.getByIdValidation, doencas.Controller.getById);
router.post('/', doencas.Controller.createValidation, doencas.Controller.create);
router.put('/:id', doencas.Controller.updateByIdValidation, doencas.Controller.updateById);
router.delete('/:id', doencas.Controller.deleteByIdValidation, doencas.Controller.deleteById);

export default router;
