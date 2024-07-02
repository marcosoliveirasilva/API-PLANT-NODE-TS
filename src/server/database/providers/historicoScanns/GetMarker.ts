import { ETableNames } from '../../ETableNames';
import { IHistoricoScann } from '../../models';
import { Knex } from '../../knex';

export const getMarker = async (page: number, limit: number, userID: number, diagnosticID = 0): Promise<IHistoricoScann[] | Error> => {
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
      .where('a.usuarioID', '<>',  Number(userID))
      .modify((queryBuilder) => {
        if (diagnosticID > 0) {
          queryBuilder.where('a.diagnosticoID', Number(diagnosticID));
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
