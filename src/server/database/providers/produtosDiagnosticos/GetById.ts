import { ETableNames } from '../../ETableNames';
import { IProdutoDiagnostico } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IProdutoDiagnostico | Error> => {
  try {
    const result = await Knex(ETableNames.produtoDiagnostico)
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
