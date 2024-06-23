import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.historicoScann, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('pessoaID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.usuario)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .bigInteger('diagnosticoID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.diagnostico)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela utilizada para armazenar o histórico de scanns realizadas por uma pessoa.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.historicoScann}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.historicoScann)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.historicoScann}`);
    });
}
