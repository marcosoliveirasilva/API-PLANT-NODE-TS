import { ETableNames } from '../../ETableNames';
import { IProduto } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, produto: Omit<IProduto, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.produto)
      .update(produto)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
