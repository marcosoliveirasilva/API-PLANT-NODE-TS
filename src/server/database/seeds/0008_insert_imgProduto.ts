import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.imgProduto).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.imgProduto).insert(imgProdutos).then(() => {
    console.log(`# Insert table ${ETableNames.imgProduto}`);
  });
}

const imgProdutos = [
  {produtoID: 1, localizacao: '/images/produtos/1.jpg'},
  {produtoID: 2, localizacao: '/images/produtos/2.jpg'},
  {produtoID: 3, localizacao: '/images/produtos/3.jpg'},
  {produtoID: 4, localizacao: '/images/produtos/4.jpg'},
  {produtoID: 5, localizacao: '/images/produtos/5.jpg'},
  {produtoID: 6, localizacao: '/images/produtos/6.jpg'},
  {produtoID: 7, localizacao: '/images/produtos/7.jpg'},
  {produtoID: 8, localizacao: '/images/produtos/8.jpg'},
  {produtoID: 9, localizacao: '/images/produtos/9.jpg'},
  {produtoID: 10, localizacao: '/images/produtos/10.jpg'},
];
