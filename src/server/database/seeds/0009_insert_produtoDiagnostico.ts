import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.produtoDiagnostico).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.produtoDiagnostico).insert(produtosDiagnosticos).then(() => {
    console.log(`# Insert table ${ETableNames.produtoDiagnostico}`);
  });
}

const produtosDiagnosticos = [
  {produtoID: 1, diagnosticoID: 1},
  {produtoID: 5, diagnosticoID: 1},
  {produtoID: 6, diagnosticoID: 1},

  {produtoID: 2, diagnosticoID: 2},
  {produtoID: 3, diagnosticoID: 2},
  {produtoID: 4, diagnosticoID: 2},

  {produtoID: 9, diagnosticoID: 3},
  {produtoID: 7, diagnosticoID: 3},
  {produtoID: 1, diagnosticoID: 3},

  {produtoID: 4, diagnosticoID: 4},
  {produtoID: 3, diagnosticoID: 4},
  {produtoID: 2, diagnosticoID: 4},

  {produtoID: 9, diagnosticoID: 5},
  {produtoID: 1, diagnosticoID: 5},
  {produtoID: 6, diagnosticoID: 5},

  {produtoID: 3, diagnosticoID: 6},
  {produtoID: 7, diagnosticoID: 6},
  {produtoID: 8, diagnosticoID: 6},

  {produtoID: 7, diagnosticoID: 7},
  {produtoID: 5, diagnosticoID: 7},
  {produtoID: 9, diagnosticoID: 7},

  {produtoID: 5, diagnosticoID: 8},
  {produtoID: 1, diagnosticoID: 8},
  {produtoID: 8, diagnosticoID: 8},
];
