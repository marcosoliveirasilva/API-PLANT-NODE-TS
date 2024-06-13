

export interface IFornecedor {
  id: number;
  pessoaID: number;
  nomeEmpresa: string;
  nomeFantasia: string;
  cnpj: string;
  urlSite: string;
  email: string;
  telefoneCelular: string;
  telefoneFixo?: string;
  endereco: string;
  latitude: string;
  longitude: string;
  created_at: Date;
  updated_at: Date;
};
