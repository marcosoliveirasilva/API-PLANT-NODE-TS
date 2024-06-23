import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.imgDiagnostico).count<[{ count: number }]>('* as count');
  if(!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.imgDiagnostico).insert(imgDiagnosticos).then(() => {
    console.log(`# Insert table ${ETableNames.imgDiagnostico}`);
  });
};

const imgDiagnosticos = [
  {diagnosticoID: 1,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 1,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 1,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 2,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 2,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 2,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 3,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 3,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 3,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 4,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 4,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 4,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 5,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 5,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 5,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 6,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 6,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 6,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 7,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 7,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 7,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},

  {diagnosticoID: 8,  localizacao: '/images/plant_desease/cereja_oidio/01.jpeg'},
  {diagnosticoID: 8,  localizacao: '/images/plant_desease/cereja_oidio/02.jpeg'},
  {diagnosticoID: 8,  localizacao: '/images/plant_desease/cereja_oidio/03.jpeg'},
];
