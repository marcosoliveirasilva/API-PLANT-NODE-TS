import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.produto, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('fornecedorID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.fornecedor)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.string('nomeProduto').index().notNullable();
      table.string('tipoProduto').index().notNullable();
      table.string('descricao', 750).checkLength('<=', 750).notNullable();
      table.string('urlProduto').notNullable();

      table.comment('Tabela utilizada para armazenar o cadastro de produtos do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.produto}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.produto)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.produto}`);
    });
}
