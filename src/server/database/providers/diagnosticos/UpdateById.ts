import { ETableNames } from '../../ETableNames';
import { IDiagnostico } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, diagnostico: Omit<IDiagnostico, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.planta)
      .update(diagnostico)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
