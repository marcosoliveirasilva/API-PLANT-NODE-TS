import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.fornecedor, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('pessoaID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.pessoa)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.string('nomeEmpresa').index().notNullable();
      table.string('nomeFantasia').index().notNullable();
      table.string('cnpj').checkLength('<=', 14).index().notNullable();
      table.string('urlSite').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('telefoneCelular').checkLength('<=', 11).unique().notNullable();
      table.string('telefoneFixo').checkLength('<=', 10).unique().nullable();
      table.string('endereco').notNullable();
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o cadastro de fornecedores do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.fornecedor}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.fornecedor)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.fornecedor}`);
    });
}
