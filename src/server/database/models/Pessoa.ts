

export interface IPessoa {
  id: number;
  nomeCompleto: string;
  cpf: string;
  telefoneCelular: string;
  telefoneFixo?: string;
  latitude: string;
  longitude: string;
  created_at: Date;
  updated_at: Date;
};
