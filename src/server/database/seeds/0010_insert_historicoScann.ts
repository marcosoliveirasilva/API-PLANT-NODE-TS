import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.historicoScann).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.historicoScann).insert(historicoScanns).then(() => {
    console.log(`# Insert table ${ETableNames.historicoScann}`);
  });
}

const historicoScanns = [
  /*{usuarioID: 1, diagnosticoID: 3, latitude: '-14.835064', longitude: '-40.890242' },
  {usuarioID: 1, diagnosticoID: 2, latitude: '-14.835064', longitude: '-40.890242' },
  {usuarioID: 1, diagnosticoID: 4, latitude: '-14.835064', longitude: '-40.890242' },*/

  {usuarioID: 2, diagnosticoID: 8, latitude: '-14.836495', longitude: '-40.886466' },
  {usuarioID: 2, diagnosticoID: 6, latitude: '-14.836495', longitude: '-40.886466' },
  {usuarioID: 2, diagnosticoID: 7, latitude: '-14.836495', longitude: '-40.886466' },

  {usuarioID: 3, diagnosticoID: 6, latitude: '-14.840156', longitude: '-40.895070' },
  {usuarioID: 3, diagnosticoID: 2, latitude: '-14.840156', longitude: '-40.895070' },
  {usuarioID: 3, diagnosticoID: 4, latitude: '-14.840156', longitude: '-40.895070' },

  {usuarioID: 4, diagnosticoID: 1, latitude: '-14.842230', longitude: '-40.880232' },
  {usuarioID: 4, diagnosticoID: 5, latitude: '-14.842230', longitude: '-40.880232' },
  {usuarioID: 4, diagnosticoID: 7, latitude: '-14.842230', longitude: '-40.880232' },

  {usuarioID: 5, diagnosticoID: 1, latitude: '-14.840675', longitude: '-40.885951' },
  {usuarioID: 5, diagnosticoID: 3, latitude: '-14.840675', longitude: '-40.885951' },
  {usuarioID: 5, diagnosticoID: 8, latitude: '-14.840675', longitude: '-40.885951' },

  {usuarioID: 6, diagnosticoID: 6, latitude: '-14.838320', longitude: '-40.878237' },
  {usuarioID: 6, diagnosticoID: 5, latitude: '-14.838320', longitude: '-40.878237' },
  {usuarioID: 6, diagnosticoID: 8, latitude: '-14.838320', longitude: '-40.878237' },
];
