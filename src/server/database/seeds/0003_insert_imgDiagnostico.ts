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
  {diagnosticoID: 1,  url: 'https://drive.google.com/uc?export=view&id=19QrjRytyKefNTLatqf7xz5fcKcg-KWsT'},
  {diagnosticoID: 1,  url: 'https://drive.google.com/uc?export=view&id=19Xc9WVcCd3YxK-mi5VLuq-YmXfSjmol3'},
  {diagnosticoID: 1,  url: 'https://drive.google.com/uc?export=view&id=19R8aGEzHwXsgK1QEvuqJb6fuauqk1C6Q'},

  {diagnosticoID: 2,  url: 'https://drive.google.com/uc?export=view&id=1AJ6XQC1tePW8U6tjXQX7ga8Ubt_7jl3X'},
  {diagnosticoID: 2,  url: 'https://drive.google.com/uc?export=view&id=1AIrxRyZmHR4g5-fUhrlKYeTL9bQUELvO'},
  {diagnosticoID: 2,  url: 'https://drive.google.com/uc?export=view&id=1ANCAJAiPEU9FZLlrPbjsPeCcGDvhArxw'},

  {diagnosticoID: 3,  url: 'https://drive.google.com/uc?export=view&id=1A4g0GCv8yQeKihFV8kphIpkXvotMjfeo'},
  {diagnosticoID: 3,  url: 'https://drive.google.com/uc?export=view&id=19fO-MpDoMjs1FE5v1cFISvGt9XQLjuT_'},
  {diagnosticoID: 3,  url: 'https://drive.google.com/uc?export=view&id=1A47XQHcTe-YBY8zE1onmrDN4677IzoAO'},

  {diagnosticoID: 4,  url: 'https://drive.google.com/uc?export=view&id=1AVahtuQtA_lW8FMGa_uNK9CZpfWOXHKv'},
  {diagnosticoID: 4,  url: 'https://drive.google.com/uc?export=view&id=1Allm1byVBVTQeuVCCOCytDwOltdidGJd'},
  {diagnosticoID: 4,  url: 'https://drive.google.com/uc?export=view&id=1AWseI4ZronQRj-tWoRFyihk9qufpiFxV'},

  {diagnosticoID: 5,  url: 'https://drive.google.com/uc?export=view&id=1ACPyvguSnbUHLY0JpyxZiGsw5COWjSgT'},
  {diagnosticoID: 5,  url: 'https://drive.google.com/uc?export=view&id=1AGKALjgmSGzbRZvpz_VDmOML19sUX4xn'},
  {diagnosticoID: 5,  url: 'https://drive.google.com/uc?export=view&id=1AD7vZkN8bOPqgB5zIbglSiIgfXobTnRT'},

  {diagnosticoID: 6,  url: 'https://drive.google.com/uc?export=view&id=1B6TVSCpkonGCHKfFGuvilr9LvNnYVoXz'},
  {diagnosticoID: 6,  url: 'https://drive.google.com/uc?export=view&id=1B14Jj9aylY2LvONv3ND8gk3PekFk9hz9'},
  {diagnosticoID: 6,  url: 'https://drive.google.com/uc?export=view&id=1B0DjN_hxttNY8miv7MoEUvuYlIfdefrl'},

  {diagnosticoID: 7,  url: 'https://drive.google.com/uc?export=view&id=1A58oBUlQ_cdnBTTOA886PqufB1P26Dcl'},
  {diagnosticoID: 7,  url: 'https://drive.google.com/uc?export=view&id=1ABMGQohNZPCFDWeOXV4kTCaEZhN70QG2'},
  {diagnosticoID: 7,  url: 'https://drive.google.com/uc?export=view&id=1ACK0uJBFGJtgnZ86Z4uasUcTCF3WH7_u'},

  {diagnosticoID: 8,  url: 'https://drive.google.com/uc?export=view&id=1ARrgN27PF3RqBIE4fhC98eAGzExSPJct'},
  {diagnosticoID: 8,  url: 'https://drive.google.com/uc?export=view&id=1AQ4r76p1vS8UKMZga4a6N-NTLQTnWKuX'},
  {diagnosticoID: 8,  url: 'https://drive.google.com/uc?export=view&id=1AS5FkcwvEG9eld1e2fJWHXwSrnoVlzOB'},
];
