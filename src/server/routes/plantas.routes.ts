import { Router } from "express";
import { plantas } from './../controllers';

const router = Router();

router.get('/', plantas.Controller.getAllValidation, plantas.Controller.getAll);
router.get('/:id', plantas.Controller.getByIdValidation, plantas.Controller.getById);
router.post('/', plantas.Controller.createValidation, plantas.Controller.create);
router.put('/:id', plantas.Controller.updateByIdValidation, plantas.Controller.updateById);
router.delete('/:id', plantas.Controller.deleteByIdValidation, plantas.Controller.deleteById);

export default router;
