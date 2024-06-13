import { IPlanta } from "../../models";

declare module 'knex/types/table' {
  interface Tables {
    planta: IPlanta
    // doenca: IDoenca
    // pessoa: IPessoa
    // usuario: IUsuario
  }
}
