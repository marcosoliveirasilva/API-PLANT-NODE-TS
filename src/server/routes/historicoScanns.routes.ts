import { Router } from "express";
import { historicoScanns } from '../controllers';

const router = Router();

router.get('/', historicoScanns.Controller.getAllValidation, historicoScanns.Controller.getAll);
router.get('/:id', historicoScanns.Controller.getByIdValidation, historicoScanns.Controller.getById);
router.post('/', historicoScanns.Controller.createValidation, historicoScanns.Controller.create);
router.put('/:id', historicoScanns.Controller.updateByIdValidation, historicoScanns.Controller.updateById);
router.delete('/:id', historicoScanns.Controller.deleteByIdValidation, historicoScanns.Controller.deleteById);

export default router;
