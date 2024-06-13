import { Router } from "express";
import doencasRoutes from './doencas.routes';
import plantasRoutes from './plantas.routes';
import diagnosticosRoutes from './diagnosticos.routes';

const router = Router();

router.use('/doencas', doencasRoutes);
router.use('/plantas', plantasRoutes);
router.use('/diagnosticos', diagnosticosRoutes);

export { router };
