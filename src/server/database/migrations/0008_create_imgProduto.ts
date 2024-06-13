import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.imgProduto, table => {
      table.bigIncrements('id').primary().index();
      table
        .bigInteger('produtoID')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.produto)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.string('localizacao').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Tabela utilizada para armazenar o caminho das imagens dos produtos.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.imgProduto}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.imgProduto)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.imgProduto}`);
    });
}
