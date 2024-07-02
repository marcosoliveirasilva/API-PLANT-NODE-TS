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
  { nomeCompleto: 'Marcos Vinicius O. Silva', cpf: '00000000000', telefoneCelular: '77988886666', telefoneFixo: '7734260000', latitude: '-14.835064', longitude: '-40.890242' },
  { nomeCompleto: 'Teste1 Teste1', cpf: '00000000001', telefoneCelular: '77988886661', telefoneFixo: '7734260001', latitude: '-14.836495', longitude: '-40.886466' },
  { nomeCompleto: 'Teste2 Teste2', cpf: '00000000002', telefoneCelular: '77988886662', telefoneFixo: '7734260002', latitude: '-14.840156', longitude: '-40.895070' },
  { nomeCompleto: 'Teste3 Teste3', cpf: '00000000003', telefoneCelular: '77988886663', telefoneFixo: '7734260003', latitude: '-14.842230', longitude: '-40.880232' },
  { nomeCompleto: 'Teste4 Teste4', cpf: '00000000004', telefoneCelular: '77988886664', telefoneFixo: '7734260004', latitude: '-14.840675', longitude: '-40.885951' },
  { nomeCompleto: 'Teste5 Teste5', cpf: '00000000005', telefoneCelular: '77988886665', telefoneFixo: '7734260005', latitude: '-14.838320', longitude: '-40.878237' },
];
