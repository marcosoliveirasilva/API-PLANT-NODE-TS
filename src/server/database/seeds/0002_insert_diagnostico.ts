import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.diagnostico).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.diagnostico).insert(diagnosticos).then(() => {
    console.log(`# Insert table ${ETableNames.diagnostico}`);
  });
};

const diagnosticos = [
  {doencaID: 1, plantaID: 1},
  {doencaID: 2, plantaID: 2},
  {doencaID: 3, plantaID: 2},
  {doencaID: 4, plantaID: 2},
  {doencaID: 5, plantaID: 3},
  {doencaID: 6, plantaID: 4},
  {doencaID: 7, plantaID: 4},
  {doencaID: 8, plantaID: 4},
];
