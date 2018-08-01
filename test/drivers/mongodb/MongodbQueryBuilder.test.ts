import 'jest'
import { QueryBuilder } from '../../../lib/query-builders/QueryBuilder'
import { MongodbQueryBuilder } from '../../../lib/drivers/mongodb/MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from '../../../lib/drivers/mongodb/MongodbQueryBuilderHandler'

describe('MongodbQueryBuilder', function() {
  it('extends QueryBuilder', function() {
    const model: any = {}
    const instance = new MongodbQueryBuilder(new MongodbQueryBuilderHandler(model))
    expect(instance).toBeInstanceOf(QueryBuilder)
  })
})
