import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.pessoa).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.pessoa).insert(pessoas).then(() => {
    console.log(`# Insert table ${ETableNames.pessoa}`);
  });
}

const pessoas = [
  { nomeCompleto: 'Marcos Vinicius O. Silva', cpf: '00000000000', telefoneCelular: '77988886666', telefoneFixo: '7734260000', latitude: '-14.83509', longitude: '-40.8926901' },
];
