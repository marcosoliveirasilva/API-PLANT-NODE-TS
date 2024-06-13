import { Router } from "express";
import { produtos } from '../controllers';

const router = Router();

router.get('/', produtos.Controller.getAllValidation, produtos.Controller.getAll);
router.get('/:id', produtos.Controller.getByIdValidation, produtos.Controller.getById);
router.post('/', produtos.Controller.createValidation, produtos.Controller.create);
router.put('/:id', produtos.Controller.updateByIdValidation, produtos.Controller.updateById);
router.delete('/:id', produtos.Controller.deleteByIdValidation, produtos.Controller.deleteById);

export default router;
