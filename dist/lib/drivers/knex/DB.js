"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { IKnexBasicQuery } from './definitions/IKnexBasicQuery'
const KnexProviderFacade_1 = require("../../facades/global/KnexProviderFacade");
// export type DB = {
//   table(name: string): Knex.QueryBuilder
//   newQuery(): Knex.QueryBuilder
// }
// export const DB: DB = {
//   table(name: string) {
//     return KnexProvider.createQueryBuilder(name)
//   },
//   newQuery() {
//     return KnexProvider.create().queryBuilder()
//   }
//   raw() {
//     return KnexProvider.create().raw
//   }
// }
exports.DB = KnexProviderFacade_1.KnexProvider.create('default');
