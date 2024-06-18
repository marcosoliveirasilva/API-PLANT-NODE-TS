import { Router } from "express";
//import { historicoScanns } from '../controllers';
//import { EnsureAuthenticated } from "../shared/middleware";

const { predict } = require('../controllers/predizerScanns/Predict');

const multer = require('multer');
const router = Router();

const upload = multer();

router.post('/', upload.single('file'), predict);


export default router;
