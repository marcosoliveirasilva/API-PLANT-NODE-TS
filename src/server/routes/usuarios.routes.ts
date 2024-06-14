import { Router } from "express";
import { usuarios } from '../controllers';

const router = Router();

router.post('/entrar', usuarios.Controller.signInValidation, usuarios.Controller.signIn);
router.post('/cadastrar', usuarios.Controller.signUpValidation, usuarios.Controller.signUp);

export default router;
