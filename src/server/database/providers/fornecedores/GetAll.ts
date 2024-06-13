import { ETableNames } from '../../ETableNames';
import { IFornecedor } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, personId: number, name: string, cnpj: string, id = 0): Promise<IFornecedor[] | Error> => {
  try {
    const result = await Knex(ETableNames.fornecedor)
      .select('*')
      .where('id', Number(id))
      .orWhere('pessoaID', Number(personId))
      .orWhere('nomeEmpresa', 'like', `%${name}%`)
      .orWhere('nomeFantasia', 'like', `%${name}%`)
      .orWhere('cnpj', cnpj)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.fornecedor)
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
