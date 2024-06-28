import { Router } from "express";
import { imgDiagnosticos } from '../controllers';
import { EnsureAuthenticated } from "../shared/middleware";

const router = Router();

router.get('/', EnsureAuthenticated, imgDiagnosticos.Controller.getAllValidation, imgDiagnosticos.Controller.getAll);

export default router;
