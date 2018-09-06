// import { IKnexBasicQuery } from './definitions/IKnexBasicQuery'
import { KnexProvider } from '../../facades/global/KnexProviderFacade'

// export interface DB extends IKnexBasicQuery {}
// export const DB: DB = {} as any

// DB.limit(12).select()

// // .where(KnexProvider.create().raw('SELECT * as test'))

import * as Knex from 'knex'

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

export const DB: Knex = KnexProvider.create('default')
