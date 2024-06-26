import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.planta, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable();
      table.string('nomeCientifico').index().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o cadastro de plantas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.planta}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.planta)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.planta}`);
    });
}
