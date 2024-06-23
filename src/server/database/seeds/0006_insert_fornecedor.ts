import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.fornecedor).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.fornecedor).insert(fornecedores).then(() => {
    console.log(`# Insert table ${ETableNames.fornecedor}`);
  });
}

const fornecedores = [
  { pessoaID: 1, nomeEmpresa: 'Agro Brasil', nomeFantasia: 'Agro Brasil', cnpj: '11111111111111', urlSite: 'https://www.teste1.com.br/', email: 'empresa1@email.com', telefoneCelular: '77988888888', telefoneFixo: '7734260000', endereco: 'Av. Régis Pachêco, 103-149 - Centro', latitude: '-14.8518416', longitude: '-40.8458557' },
  { pessoaID: 1, nomeEmpresa: 'Agro Conquista', nomeFantasia: 'Agro Conquista', cnpj: '11111111111112', urlSite: 'https://www.teste2.com.br/', email: 'empresa2@email.com', telefoneCelular: '77955555555', telefoneFixo: '7734261111', endereco: 'R. Salgado Filho, 290 - Centro', latitude: '-14.853706', longitude: '-40.8483624' },
];
