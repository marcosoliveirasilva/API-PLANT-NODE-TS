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
  {usuarioID: 1, diagnosticoID: 1, latitude: '-14.83509', longitude: '-40.8926901' },
  {usuarioID: 1, diagnosticoID: 2, latitude: '-14.83509', longitude: '-40.8926901' },
  {usuarioID: 1, diagnosticoID: 4, latitude: '-14.83509', longitude: '-40.8926901' },
];
