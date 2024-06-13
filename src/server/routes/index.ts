import { Router } from "express";
import doencasRoutes from './doencas.routes';
import plantasRoutes from './plantas.routes';
import diagnosticosRoutes from './diagnosticos.routes';
import pessoasRoutes from './pessoas.routes';
import fornecedoresRoutes from './fornecedores.routes';
import produtosRoutes from './produtos.routes';

const router = Router();

router.use('/doencas', doencasRoutes);
router.use('/plantas', plantasRoutes);
router.use('/diagnosticos', diagnosticosRoutes);
router.use('/pessoas', pessoasRoutes);
router.use('/fornecedores', fornecedoresRoutes);
router.use('/produtos', produtosRoutes);

export { router };
