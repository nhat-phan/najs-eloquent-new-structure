import { Model } from '../../model/Model'
import { KnexQueryBuilderType } from './KnexQueryBuilder'
import { PrototypeManager } from '../../util/PrototypeManager'
import * as Knex from 'knex'

export class KnexModel extends Model {
  public id?: string

  newQuery(): KnexQueryBuilderType<this>
  newQuery(nativeCb: (queryBuilder: Knex.QueryBuilder) => any): KnexQueryBuilderType<this>
  newQuery(name: string): KnexQueryBuilderType<this>
  newQuery(name?: string | ((queryBuilder: Knex.QueryBuilder) => any)): KnexQueryBuilderType<this> {
    if (typeof name === 'string') {
      return super.newQuery(name) as any
    }

    const query: KnexQueryBuilderType<this> = super.newQuery() as any
    return query.native(name as (queryBuilder: Knex.QueryBuilder) => any)
  }
}

PrototypeManager.stopFindingRelationsIn(KnexModel.prototype)

// async function test() {
//   const model = new KnexModel()

//   model
//     .newQuery(function(queryBuilder) {
//       queryBuilder.select()
//     })
//     .firstOrFail('test')

//   // const result = await model.newQuery().get()

//   // result.first(function() {
//   //   return true
//   // })
// }
