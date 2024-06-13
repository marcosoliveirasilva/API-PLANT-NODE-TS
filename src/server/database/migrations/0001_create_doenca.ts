import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.doenca, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable();
      table.string('nomeCientifico').index().notNullable();
      table.string('sobre', 750).checkLength('<=', 750).notNullable();
      table.string('fonte').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o cadastro de doenças do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.doenca}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.doenca)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.doenca}`);
    });
}
