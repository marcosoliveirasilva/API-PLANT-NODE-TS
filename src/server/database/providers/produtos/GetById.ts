import { ETableNames } from '../../ETableNames';
import { IProduto } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IProduto | Error> => {
  try {
    const result = await Knex(ETableNames.produto)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
