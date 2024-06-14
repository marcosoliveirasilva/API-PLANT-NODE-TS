import {
  IPlanta,
  IDoenca,
  IDiagnostico,
  IPessoa,
  IUsuario,
  IFornecedor,
  IProduto,
  IProdutoDiagnostico,
  IHistoricoScann,
} from "../../models";

declare module 'knex/types/table' {
  interface Tables {
    planta: IPlanta
    doenca: IDoenca
    diagnostico: IDiagnostico
    imgDiagnostico: IImgDiagnostico
    pessoa: IPessoa
    usuario: IUsuario
    fornecedor: IFornecedor
    produto: IProduto
    imgProduto: IImgProduto
    produtoDiagnostico: IProdutoDiagnostico
    historicoScann: IHistoricoScann
  }
}
