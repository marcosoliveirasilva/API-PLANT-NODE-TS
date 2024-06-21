import * as GetByEmail from './GetByEmail';
import * as GetById from './GetById';
import * as create from './Create';


export const Provider = {
  ...GetByEmail,
  ...GetById,
  ...create,
};
