import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';


export const create = async (pessoa: Omit<IPessoa, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
