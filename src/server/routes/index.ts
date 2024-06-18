import { Router } from "express";
import doencasRoutes from './doencas.routes';
import plantasRoutes from './plantas.routes';
import diagnosticosRoutes from './diagnosticos.routes';
import pessoasRoutes from './pessoas.routes';
import fornecedoresRoutes from './fornecedores.routes';
import produtosRoutes from './produtos.routes';
import produtosDiagnosticosRoutes from './produtosDiagnosticos.routes';
import historicoScannsRoutes from './historicoScanns.routes';
import usuariosRoutes from './usuarios.routes';
import predizerScannsRoutes from './predizerScanns.routes';

const router = Router();

router.use('/doencas', doencasRoutes);
router.use('/plantas', plantasRoutes);
router.use('/diagnosticos', diagnosticosRoutes);
router.use('/pessoas', pessoasRoutes);
router.use('/fornecedores', fornecedoresRoutes);
router.use('/produtos', produtosRoutes);
router.use('/produtosDiagnosticos', produtosDiagnosticosRoutes);
router.use('/historicoScanns', historicoScannsRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/predizerScanns', predizerScannsRoutes);

export { router };
