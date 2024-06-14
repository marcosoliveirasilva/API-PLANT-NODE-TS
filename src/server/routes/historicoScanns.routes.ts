import { Router } from "express";
import { historicoScanns } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, historicoScanns.Controller.getAllValidation, historicoScanns.Controller.getAll);
router.get('/:id', EnsureAuthenticated, historicoScanns.Controller.getByIdValidation, historicoScanns.Controller.getById);
router.post('/', EnsureAuthenticated, historicoScanns.Controller.createValidation, historicoScanns.Controller.create);
router.put('/:id', EnsureAuthenticated, historicoScanns.Controller.updateByIdValidation, historicoScanns.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, historicoScanns.Controller.deleteByIdValidation, historicoScanns.Controller.deleteById);

export default router;
