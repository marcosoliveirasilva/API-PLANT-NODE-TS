import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.planta, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 250).checkLength('<=', 250).notNullable();
      table.string('nome_cientifico', 250).checkLength('<=', 250).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela usada para armazenar plantas do sistema.');
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
