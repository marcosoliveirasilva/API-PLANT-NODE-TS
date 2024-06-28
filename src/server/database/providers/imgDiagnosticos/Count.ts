import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (diagnosticoID = 0): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.imgDiagnostico)
      .where('diagnosticoID', Number(diagnosticoID))
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
