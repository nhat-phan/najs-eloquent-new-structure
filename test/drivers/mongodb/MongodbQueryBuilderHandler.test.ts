import 'jest'
import { init_mongodb } from '../../util'
import { QueryBuilderHandlerBase } from '../../../lib/query-builders/QueryBuilderHandlerBase'
import { MongodbQueryBuilderHandler } from '../../../lib/drivers/mongodb/MongodbQueryBuilderHandler'
import { BasicQuery } from '../../../lib/query-builders/shared/BasicQuery'
import { MongodbExecutor } from '../../../lib/drivers/mongodb/MongodbExecutor'
import { ConditionQueryHandle } from '../../../lib/query-builders/shared/ConditionQueryHandle'
import { MongodbConvention } from '../../../lib/query-builders/shared/MongodbConvention'

describe('MongodbQueryBuilderHandler', function() {
  it('extends QueryBuilderHandlerBase', function() {
    const model: any = {}
    const instance = new MongodbQueryBuilderHandler(model)
    expect(instance).toBeInstanceOf(QueryBuilderHandlerBase)
  })

  beforeAll(async function() {
    await init_mongodb('mongodb_query_builder_handler')
  })

  describe('constructor()', function() {
    it('makes 3 instances, 1. convention = MongodbConvention', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getQueryConvention()).toBeInstanceOf(MongodbConvention)
    })

    it('makes 3 instances, 2. basicQuery = BasicQuery', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getBasicQuery()).toBeInstanceOf(BasicQuery)
    })

    it('makes 3 instances, 3. conditionQuery = ConditionQueryHandle which wrap "basicQuery"', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getConditionQuery()).toBeInstanceOf(ConditionQueryHandle)
      expect(handler.getConditionQuery()['basicConditionQuery'] === handler.getBasicQuery()).toBe(true)
    })
  })

  describe('.getBasicQuery()', function() {
    it('simply returns "basicQuery" property', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getBasicQuery() === handler['basicQuery']).toBe(true)
    })
  })

  describe('.getConditionQuery()', function() {
    it('simply returns "conditionQuery" property', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getConditionQuery() === handler['conditionQuery']).toBe(true)
    })
  })

  describe('.getQueryConvention()', function() {
    it('simply returns "convention" property', function() {
      const model: any = {}
      const handler = new MongodbQueryBuilderHandler(model)
      expect(handler.getQueryConvention() === handler['convention']).toBe(true)
    })
  })

  describe('.getQueryExecutor()', function() {
    it('creates and returns new instance of MongodbExecutor', function() {
      const model: any = {
        getRecordName() {
          return 'model'
        }
      }
      const handler = new MongodbQueryBuilderHandler(model)
      const executor1 = handler.getQueryExecutor()
      const executor2 = handler.getQueryExecutor()
      expect(executor1 === executor2).toBe(false)
      expect(executor1).toBeInstanceOf(MongodbExecutor)
    })
  })
})
