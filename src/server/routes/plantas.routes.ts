import { Router } from "express";
import { plantas } from './../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, plantas.Controller.getAllValidation, plantas.Controller.getAll);
router.get('/:id', EnsureAuthenticated, plantas.Controller.getByIdValidation, plantas.Controller.getById);
router.post('/', EnsureAuthenticated, plantas.Controller.createValidation, plantas.Controller.create);
router.put('/:id', EnsureAuthenticated, plantas.Controller.updateByIdValidation, plantas.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, plantas.Controller.deleteByIdValidation, plantas.Controller.deleteById);

export default router;
