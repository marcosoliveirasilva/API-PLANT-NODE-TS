import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.historicoScann).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.historicoScann).insert(historicoScanns).then(() => {
    console.log(`# Insert table ${ETableNames.historicoScann}`);
  });
}

const historicoScanns = [
  {pessoaID: 1, diagnosticoID: 1},
  {pessoaID: 1, diagnosticoID: 2},
  {pessoaID: 1, diagnosticoID: 4},
];
