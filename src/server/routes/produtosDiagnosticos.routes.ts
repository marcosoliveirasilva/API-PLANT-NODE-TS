import { Router } from "express";
import { produtosDiagnosticos } from '../controllers';

const router = Router();

router.get('/', produtosDiagnosticos.Controller.getAllValidation, produtosDiagnosticos.Controller.getAll);
router.get('/:id', produtosDiagnosticos.Controller.getByIdValidation, produtosDiagnosticos.Controller.getById);
router.post('/', produtosDiagnosticos.Controller.createValidation, produtosDiagnosticos.Controller.create);
router.put('/:id', produtosDiagnosticos.Controller.updateByIdValidation, produtosDiagnosticos.Controller.updateById);
router.delete('/:id', produtosDiagnosticos.Controller.deleteByIdValidation, produtosDiagnosticos.Controller.deleteById);

export default router;
