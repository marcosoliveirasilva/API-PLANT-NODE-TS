import { Router } from "express";
import { produtos } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, produtos.Controller.getAllValidation, produtos.Controller.getAll);
router.get('/:id', EnsureAuthenticated, produtos.Controller.getByIdValidation, produtos.Controller.getById);
router.post('/', EnsureAuthenticated, produtos.Controller.createValidation, produtos.Controller.create);
router.put('/:id', EnsureAuthenticated, produtos.Controller.updateByIdValidation, produtos.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, produtos.Controller.deleteByIdValidation, produtos.Controller.deleteById);

export default router;
