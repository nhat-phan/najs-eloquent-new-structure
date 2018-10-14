import 'jest'
import * as Sinon from 'sinon'
import { Relationship } from '../../../lib/relations/Relationship'
import { HasOne } from '../../../lib/relations/relationships/HasOne'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { DataBuffer } from '../../../lib/data/DataBuffer'
import { DataCollector } from '../../../lib/data/DataCollector'

const reader = {
  getAttribute(data: object, field: string) {
    return data[field]
  },

  pick(data: object, fields: string[]) {
    return data
  }
}
describe('HasOneOrMany', function() {
  function makeRelation(model: any, name: string, targetDefinition: any, targetKey: any, localKey: any) {
    return new HasOne(model, name, targetDefinition, targetKey, localKey)
  }

  it('extends Relation', function() {
    const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id')
    expect(relation).toBeInstanceOf(Relationship)
    expect(relation).toBeInstanceOf(HasOneOrMany)
  })

  describe('constructor()', function() {
    it('assign target to "targetDefinition", targetKey to "targetKeyName", rootKey to "rootKeyName"', function() {
      const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id')
      expect(relation['rootKeyName']).toEqual('id')
      expect(relation['targetKeyName']).toEqual('target_id')
      expect(relation['targetDefinition']).toEqual('Target')
    })
  })

  describe('.getQueryBuilder()', function() {
    it('returns a queryBuilder from targetModel, which also contains the dataBucket of relation', function() {
      const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id')
      const queryBuilder: any = {
        handler: {
          setRelationDataBucket() {}
        }
      }
      const targetModel: any = {
        newQuery() {
          return queryBuilder
        }
      }
      relation['targetModelInstance'] = targetModel

      const dataBucket: any = {}
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket')
      const newQuerySpy = Sinon.spy(targetModel, 'newQuery')

      expect(relation.getQueryBuilder('name') === queryBuilder).toBe(true)
      expect(newQuerySpy.calledWith('name')).toBe(true)
      expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true)
    })
  })

  describe('.collectData()', function() {
    it('returns undefined if there is no DataBucket', function() {
      const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id')
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(undefined)

      const executor = {
        executeCollector() {}
      }
      const getExecutorStub = Sinon.stub(relation, 'getExecutor')
      getExecutorStub.returns(executor)

      const spy = Sinon.spy(executor, 'executeCollector')

      expect(relation.collectData()).toBe(undefined)
      expect(spy.called).toBe(false)
    })

    it('creates collector which created for DataBuffer of Target then calls and returns .getExecutor().executorCollector()', function() {
      const rootModel = {
        getAttribute(name: any) {
          return name + '-value'
        }
      }

      const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id')

      const dataBuffer = new DataBuffer('id', reader)
      const dataBucket = {
        getDataOf() {
          return dataBuffer
        }
      }

      const targetModel: any = {}
      relation['targetModelInstance'] = targetModel

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const getDataOfSpy = Sinon.spy(dataBucket, 'getDataOf')

      const executor = {
        executeCollector() {}
      }
      const getExecutorStub = Sinon.stub(relation, 'getExecutor')
      getExecutorStub.returns(executor)

      const executeCollectorStub = Sinon.stub(executor, 'executeCollector')
      executeCollectorStub.returns('anything')

      expect(relation.collectData()).toEqual('anything')
      expect(getDataOfSpy.calledWith(targetModel))

      const collector = executeCollectorStub.lastCall.args[0]
      expect(collector).toBeInstanceOf(DataCollector)
      expect(collector['dataBuffer'] === dataBuffer).toBe(true)
      expect(collector['conditions']).toEqual({
        $and: [
          {
            field: 'target_id',
            operator: '=',
            value: 'id-value',
            reader: reader
          }
        ]
      })
    })
  })

  describe('.fetchData()', function() {
    it('gets query from .getQueryBuilder() then pass .where() then calls and returns .getExecutor().executeQuery() for lazy load', async function() {
      const query = {
        where() {},
        whereIn() {}
      }

      const rootModel: any = {
        getAttribute(name: string) {
          return name + '-value'
        }
      }

      const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id')

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(undefined)

      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      relation['targetModelInstance'] = targetModel

      const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder')
      getQueryBuilderStub.returns(query)

      const executor = {
        executeQuery() {}
      }
      const getExecutorStub = Sinon.stub(relation, 'getExecutor')
      getExecutorStub.returns(executor)

      const executeQueryStub = Sinon.stub(executor, 'executeQuery')
      executeQueryStub.returns('anything')

      const whereSpy = Sinon.spy(query, 'where')
      const whereInSpy = Sinon.spy(query, 'whereIn')

      expect(await relation.fetchData('lazy')).toEqual('anything')
      expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true)
      expect(executeQueryStub.calledWith(query)).toBe(true)
      expect(whereSpy.calledWith('target_id', 'id-value')).toBe(true)
      expect(whereInSpy.called).toBe(false)
    })

    it('gets query from .getQueryBuilder() then calls and returns .getExecutor().getEmptyValue() for eager load if there is no dataBucket', async function() {
      const query = {
        where() {},
        whereIn() {}
      }

      const rootModel: any = {
        getAttribute(name: string) {
          return name + '-value'
        }
      }

      const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id')

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(undefined)

      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      relation['targetModelInstance'] = targetModel

      const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder')
      getQueryBuilderStub.returns(query)

      const executor = {
        executeQuery() {},
        getEmptyValue() {}
      }
      const getExecutorStub = Sinon.stub(relation, 'getExecutor')
      getExecutorStub.returns(executor)

      const executeQueryStub = Sinon.stub(executor, 'executeQuery')
      executeQueryStub.returns('anything')

      const getEmptyValueStub = Sinon.stub(executor, 'getEmptyValue')
      getEmptyValueStub.returns('empty')

      const whereSpy = Sinon.spy(query, 'where')
      const whereInSpy = Sinon.spy(query, 'whereIn')

      expect(await relation.fetchData('eager')).toEqual('empty')
      expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true)
      expect(executeQueryStub.calledWith(query)).toBe(false)
      expect(whereSpy.called).toBe(false)
      expect(whereInSpy.called).toBe(false)
    })

    it('gets query from .getQueryBuilder() then pass .whereIn() then calls and returns .getExecutor().executeQuery() for eager load', async function() {
      const query = {
        where() {},
        whereIn() {}
      }

      const rootModel: any = {
        getAttribute(name: string) {
          return name + '-value'
        }
      }

      const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'field')

      const dataBuffer = new DataBuffer('id', reader)
      dataBuffer
        .add({ id: 1, field: 'a' })
        .add({ id: 2, field: 'b' })
        .add({ id: 3, field: 'c' })
      const dataBucket = {
        getDataOf() {
          return dataBuffer
        }
      }
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      relation['targetModelInstance'] = targetModel

      const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder')
      getQueryBuilderStub.returns(query)

      const executor = {
        executeQuery() {},
        getEmptyValue() {}
      }
      const getExecutorStub = Sinon.stub(relation, 'getExecutor')
      getExecutorStub.returns(executor)

      const executeQueryStub = Sinon.stub(executor, 'executeQuery')
      executeQueryStub.returns('anything')

      const whereSpy = Sinon.spy(query, 'where')
      const whereInSpy = Sinon.spy(query, 'whereIn')

      expect(await relation.fetchData('eager')).toEqual('anything')
      expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true)
      expect(executeQueryStub.calledWith(query)).toBe(true)
      expect(whereSpy.called).toBe(false)
      expect(whereInSpy.calledWith('target_id', ['a', 'b', 'c'])).toBe(true)
    })
  })

  describe('.isInverseOf()', function() {
    // TODO: implementation needed
    it('should work', function() {
      const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id')
      relation.isInverseOf({} as any)
    })
  })
})
