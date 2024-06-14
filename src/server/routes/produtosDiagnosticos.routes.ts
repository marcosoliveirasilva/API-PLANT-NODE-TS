import { Router } from "express";
import { produtosDiagnosticos } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, produtosDiagnosticos.Controller.getAllValidation, produtosDiagnosticos.Controller.getAll);
router.get('/:id', EnsureAuthenticated, produtosDiagnosticos.Controller.getByIdValidation, produtosDiagnosticos.Controller.getById);
router.post('/', EnsureAuthenticated, produtosDiagnosticos.Controller.createValidation, produtosDiagnosticos.Controller.create);
router.put('/:id', EnsureAuthenticated, produtosDiagnosticos.Controller.updateByIdValidation, produtosDiagnosticos.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, produtosDiagnosticos.Controller.deleteByIdValidation, produtosDiagnosticos.Controller.deleteById);

export default router;
