import { ETableNames } from '../../ETableNames';
import { IFornecedor } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, fornecedor: Omit<IFornecedor, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.fornecedor)
      .update(fornecedor)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
