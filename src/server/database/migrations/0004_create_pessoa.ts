import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('cpf').checkLength('=', 11).index().notNullable();
      table.string('email').unique().notNullable();
      table.string('telefoneCelular').checkLength('=', 11).unique().notNullable();
      table.string('telefoneFixo').checkLength('=', 10).unique().nullable();
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o cadastro de pessoas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}
