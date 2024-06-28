import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.imgDiagnostico, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('diagnosticoID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.diagnostico)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.string('url').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o caminho das imagens de plantas doentes.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.imgDiagnostico}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.imgDiagnostico)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.imgDiagnostico}`);
    });
}
