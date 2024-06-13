import { Router } from "express";
import doencasRoutes from './doencas.routes';
import plantasRoutes from './plantas.routes';

const router = Router();

router.use('/doencas', doencasRoutes);
router.use('/plantas', plantasRoutes);

export { router };
