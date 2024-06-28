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
  {produtoID: 1, url: 'https://drive.google.com/uc?export=view&id=1BY8fi6IgjNQwEJ8yvOK4dVtDQSnSw0dP'},
  {produtoID: 2, url: 'https://drive.google.com/uc?export=view&id=1B_M3AUFEY4UdwlL2GaMOH4eyGw9Zqg6b'},
  {produtoID: 3, url: 'https://drive.google.com/uc?export=view&id=1Bya7_vr8O84yFi7cuNaOSBaHcddWd-7t'},
  {produtoID: 4, url: 'https://drive.google.com/uc?export=view&id=1BzahxmTiuuxkB48-jFMoayGqVB8Skj_d'},
  {produtoID: 5, url: 'https://drive.google.com/uc?export=view&id=1BKWqjeeEtuXVrEKnhUwHoXKOF9IW1Iw7'},
  {produtoID: 6, url: 'https://drive.google.com/uc?export=view&id=1Bw38CpGirDY0XK6pTTA-kB59QUvZpIsi'},
  {produtoID: 7, url: 'https://drive.google.com/uc?export=view&id=1Ba_fALoeIOlsOltBx33gMNtZxlWMilnu'},
  {produtoID: 8, url: 'https://drive.google.com/uc?export=view&id=1BfMZT9s6CTXl7VS9VxWaQLNdyzOjYyv9'},
  {produtoID: 9, url: 'https://drive.google.com/uc?export=view&id=1C3ap4yrZAQ6XQZesVm1r-wF67ZzwGhtl'},
  {produtoID: 10, url: 'https://drive.google.com/uc?export=view&id=1Bfgk2oHMvA3xy878LFB1XyvHvo6-HHTo'},
];
