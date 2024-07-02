import * as getAll from './GetAll';
import * as getById from './GetById';
import * as getMe from './GetMe';
import * as getMarker from './GetMarker';
import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteByID from './DeleteById';

export const Controller = {
  ...getAll,
  ...getById,
  ...getMe,
  ...getMarker,
  ...create,
  ...updateById,
  ...deleteByID,
}


