import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.produtoDiagnostico, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('produtoID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.produto)
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

      table.comment('Tabela utilizada para relacionar produtos a diagnósticos.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.produtoDiagnostico}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.produtoDiagnostico)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.produtoDiagnostico}`);
    });
}
