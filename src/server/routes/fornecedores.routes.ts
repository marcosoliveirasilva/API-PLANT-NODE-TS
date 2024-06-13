import { Router } from "express";
import { fornecedores } from '../controllers';

const router = Router();

router.get('/', fornecedores.Controller.getAllValidation, fornecedores.Controller.getAll);
router.get('/:id', fornecedores.Controller.getByIdValidation, fornecedores.Controller.getById);
router.post('/', fornecedores.Controller.createValidation, fornecedores.Controller.create);
router.put('/:id', fornecedores.Controller.updateByIdValidation, fornecedores.Controller.updateById);
router.delete('/:id', fornecedores.Controller.deleteByIdValidation, fornecedores.Controller.deleteById);

export default router;
