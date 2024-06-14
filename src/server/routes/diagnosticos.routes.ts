import { Router } from "express";
import { diagnosticos } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, diagnosticos.Controller.getAllValidation, diagnosticos.Controller.getAll);
router.get('/:id', EnsureAuthenticated, diagnosticos.Controller.getByIdValidation, diagnosticos.Controller.getById);
router.post('/', EnsureAuthenticated, diagnosticos.Controller.createValidation, diagnosticos.Controller.create);
router.put('/:id', EnsureAuthenticated, diagnosticos.Controller.updateByIdValidation, diagnosticos.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, diagnosticos.Controller.deleteByIdValidation, diagnosticos.Controller.deleteById);

export default router;
