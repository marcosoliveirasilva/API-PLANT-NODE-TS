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
  { pessoaID: 2, nome: 'teste1', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'teste1@email.com' },
  { pessoaID: 3, nome: 'teste2', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'teste2@email.com' },
  { pessoaID: 4, nome: 'teste3', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'teste3@email.com' },
  { pessoaID: 5, nome: 'teste4', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'teste4@email.com' },
  { pessoaID: 6, nome: 'teste5', senha: '$2a$08$KHtbfX9s/hIx146eqP1LJ.sGyCk66VoX2L884k5XqoSq.K4l3R39e', email: 'teste5@email.com' },
];
