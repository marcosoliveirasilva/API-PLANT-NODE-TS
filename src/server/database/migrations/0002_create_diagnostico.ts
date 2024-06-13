import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.diagnostico, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('doencaID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.doenca)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .bigInteger('plantaID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.planta)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela utilizada para armazenar o cadastro de diagnósticos do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.diagnostico}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.diagnostico)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.diagnostico}`);
    });
}
