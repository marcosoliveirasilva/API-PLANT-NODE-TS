import { Router } from "express";
import { fornecedores } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, fornecedores.Controller.getAllValidation, fornecedores.Controller.getAll);
router.get('/:id', EnsureAuthenticated, fornecedores.Controller.getByIdValidation, fornecedores.Controller.getById);
router.post('/', EnsureAuthenticated, fornecedores.Controller.createValidation, fornecedores.Controller.create);
router.put('/:id', EnsureAuthenticated, fornecedores.Controller.updateByIdValidation, fornecedores.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, fornecedores.Controller.deleteByIdValidation, fornecedores.Controller.deleteById);

export default router;
