import { Router } from "express";
import { doencas } from './../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, doencas.Controller.getAllValidation, doencas.Controller.getAll);
router.get('/:id', EnsureAuthenticated, doencas.Controller.getByIdValidation, doencas.Controller.getById);
router.post('/', EnsureAuthenticated, doencas.Controller.createValidation, doencas.Controller.create);
router.put('/:id', EnsureAuthenticated, doencas.Controller.updateByIdValidation, doencas.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, doencas.Controller.deleteByIdValidation, doencas.Controller.deleteById);

export default router;
