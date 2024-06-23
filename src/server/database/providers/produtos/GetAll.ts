import { ETableNames } from '../../ETableNames';
import { IProduto } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, supplierId: number, name: string, id = 0): Promise<IProduto[] | Error> => {
  try {
    const result = await Knex(ETableNames.produto)
      .select('*')
      .where('id', Number(id))
      .orWhere('fornecedorID', Number(supplierId))
      .orWhere('nomeProduto', 'like', `%${name}%`)
      .orWhere('tipoProduto', 'like', `%${name}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.produto)
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
