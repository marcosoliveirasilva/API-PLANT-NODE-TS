import { ETableNames } from '../../ETableNames';
import { IHistoricoScann } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, userID: number, diagnosticID: number, id = 0): Promise<IHistoricoScann[] | Error> => {
  try {
    const result = await Knex(ETableNames.historicoScann)
      .select('*')
      .where('id', Number(id))
      .orWhere('usuarioID', Number(userID))
      .orWhere('diagnosticoID', Number(diagnosticID))
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.historicoScann)
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
