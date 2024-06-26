import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (personId = 0, name = '', cnpj = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.fornecedor)
      .where('pessoaID', Number(personId))
      .orWhere('nomeEmpresa', 'like', `%${name}%`)
      .orWhere('nomeFantasia', 'like', `%${name}%`)
      .orWhere('cnpj', cnpj)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
