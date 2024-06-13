import { Router } from "express";
import { diagnosticos } from '../controllers';

const router = Router();

router.get('/', diagnosticos.Controller.getAllValidation, diagnosticos.Controller.getAll);
router.get('/:id', diagnosticos.Controller.getByIdValidation, diagnosticos.Controller.getById);
router.post('/', diagnosticos.Controller.createValidation, diagnosticos.Controller.create);
router.put('/:id', diagnosticos.Controller.updateByIdValidation, diagnosticos.Controller.updateById);
router.delete('/:id', diagnosticos.Controller.deleteByIdValidation, diagnosticos.Controller.deleteById);

export default router;
