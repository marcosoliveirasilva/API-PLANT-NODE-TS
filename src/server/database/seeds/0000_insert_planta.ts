import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.planta).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.planta).insert(plantas).then(() => {
    console.log(`# Insert table ${ETableNames.planta}`);
  });
}

const plantas = [
  {nome: 'Cerejeira',   nomeCientifico: 'Prunus subg. Cerasus'},
  {nome: 'Macieira',    nomeCientifico: 'Malus'},
  {nome: 'Morangueiro', nomeCientifico: 'Fragaria'},
  {nome: 'Videira',     nomeCientifico: 'Vitis'},
];
