import { ETableNames } from '../../ETableNames';
import { IDiagnostico } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, deseaseID: string, plantID: string, id = 0):
Promise<IDiagnostico[] | Error> => {
  try {
    const result = await Knex(ETableNames.diagnostico)
      .select('*')
      .where('id', Number(id))
      .orWhere('doencaID', deseaseID)
      .orWhere('plantaID', plantID)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.diagnostico)
        .select('*')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
