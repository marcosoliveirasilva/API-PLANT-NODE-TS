import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';
import * as getAll from './GetAll';
import * as getMe from './GetMe';
import * as getMarker from './GetMarker';
import * as count from './Count';


export const Provider = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...getMe,
  ...getMarker,
  ...count,
};
