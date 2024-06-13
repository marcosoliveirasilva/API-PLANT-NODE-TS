import { ETableNames } from '../../ETableNames';
import { IPlanta } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, name: string, id = 0): Promise<IPlanta[] | Error> => {
  try {
    const result = await Knex(ETableNames.planta)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${name}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.planta)
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
