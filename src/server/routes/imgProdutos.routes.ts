import { Router } from "express";
import { imgProdutos } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, imgProdutos.Controller.getAllValidation, imgProdutos.Controller.getAll);

export default router;
