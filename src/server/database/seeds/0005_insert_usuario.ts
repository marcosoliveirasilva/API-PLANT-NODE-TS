import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.usuario).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.usuario).insert(usuarios).then(() => {
    console.log(`# Insert table ${ETableNames.usuario}`);
  });
}

const usuarios = [
  { pessoaID: 1, nome: 'marcos.silva', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'marcos@email.com' },
];
