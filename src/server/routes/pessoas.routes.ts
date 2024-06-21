import { Router } from "express";
import { pessoas } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/Me', EnsureAuthenticated, pessoas.Controller.getAllValidation, pessoas.Controller.getMe);
router.get('/', EnsureAuthenticated, pessoas.Controller.getAllValidation, pessoas.Controller.getAll);
router.get('/:id', EnsureAuthenticated, pessoas.Controller.getByIdValidation, pessoas.Controller.getById);
router.post('/', EnsureAuthenticated, pessoas.Controller.createValidation, pessoas.Controller.create);
router.put('/:id', EnsureAuthenticated, pessoas.Controller.updateByIdValidation, pessoas.Controller.updateById);
router.delete('/:id', EnsureAuthenticated, pessoas.Controller.deleteByIdValidation, pessoas.Controller.deleteById);

export default router;
