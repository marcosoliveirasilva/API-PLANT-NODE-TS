import { ETableNames } from '../../ETableNames';
import { IDiagnostico } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, deseaseID: number, plantID: number, id = 0):
Promise<IDiagnostico[] | Error> => {
  try {
    const result = await Knex(`${ETableNames.diagnostico} as a`)
      .select(
        'a.*',
        'c.nome as nomePlanta',
        'c.nomeCientifico as nomeCientificoPlanta',
        'd.nome as nomeDoenca',
        'd.nomeCientifico as nomeCientificoDoenca'
      )
      .join(`${ETableNames.planta} as c`, 'a.plantaID', 'c.id')
      .join(`${ETableNames.doenca} as d`, 'a.doencaID', 'd.id')
      .modify((queryBuilder) => {
        if (deseaseID > 0) {
          queryBuilder.where('a.doencaID', Number(deseaseID));
        }
        if (plantID > 0) {
          queryBuilder.where('a.plantaID', Number(plantID));
        }
        if (id > 0) {
          queryBuilder.where('a.id', Number(id));
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
