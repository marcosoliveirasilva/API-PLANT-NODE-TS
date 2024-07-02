import { ETableNames } from '../../ETableNames';
import { IHistoricoScann } from '../../models';
import { Knex } from '../../knex';

export const getMe = async (page: number, limit: number, userID: number, id = 0): Promise<IHistoricoScann[] | Error> => {
  try {
    const result = await Knex(`${ETableNames.historicoScann} as a`)
      .select(
        'a.*',
        'b.plantaID',
        'c.nome as nomePlanta',
        'c.nomeCientifico as nomeCientificoPlanta',
        'b.doencaID',
        'd.nome as nomeDoenca',
        'd.nomeCientifico as nomeCientificoDoenca'
      )
      .join(`${ETableNames.diagnostico} as b`, 'a.diagnosticoID', 'b.id')
      .join(`${ETableNames.planta} as c`, 'b.plantaID', 'c.id')
      .join(`${ETableNames.doenca} as d`, 'b.doencaID', 'd.id')
      .where('a.usuarioID', Number(userID))
      .modify((queryBuilder) => {
        if (id > 0) {
          queryBuilder.orWhere('a.id', Number(id));
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item: { id: number; }) => item.id !== id)) {
      const resultById = await Knex(`${ETableNames.historicoScann} as a`)
        .select(
          'a.*',
          'c.nome as nomePlanta',
          'c.nomeCientifico as nomeCientificoPlanta',
          'd.nome as nomeDoenca',
          'd.nomeCientifico as nomeCientificoDoenca'
        )
        .join(`${ETableNames.diagnostico} as b`, 'a.diagnosticoID', 'b.id')
        .join(`${ETableNames.planta} as c`, 'b.plantaID', 'c.id')
        .join(`${ETableNames.doenca} as d`, 'b.doencaID', 'd.id')
        .where('a.id', '=', Number(id))
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
