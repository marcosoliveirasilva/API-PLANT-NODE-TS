import { ETableNames } from '../../ETableNames';
import { IHistoricoScann } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, historicoScann: Omit<IHistoricoScann, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.historicoScann)
      .update(historicoScann)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
