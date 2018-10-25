import 'jest'
import * as Sinon from 'sinon'
import { register } from 'najs-binding'
import * as Helpers from '../../../lib/util/helpers'
import { Relationship } from '../../../lib/relations/Relationship'
import { ManyToMany } from '../../../lib/relations/relationships/ManyToMany'
import { PivotModel } from './../../../lib/relations/relationships/pivot/PivotModel'
import { isPromise } from '../../../lib/util/isPromise'
import { RelationUtilities } from '../../../lib/relations/RelationUtilities'
import { make_collection } from '../../../lib/util/factory'
import { Record } from '../../../lib/drivers/Record'
import { DataBuffer } from '../../../lib/data/DataBuffer'

const reader = {
  getAttribute(data: object, field: string) {
    return data[field]
  },

  pick(data: object, fields: string[]) {
    return data
  }
}

describe('ManyToMany', function() {
  it('extends Relationship class and implements Autoload under name "NajsEloquent.Relation.Relationship.ManyToMany"', function() {
    const rootModel: any = {}
    const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
    expect(relation).toBeInstanceOf(Relationship)
    expect(relation.getClassName()).toEqual('NajsEloquent.Relation.Relationship.ManyToMany')
  })

  describe('constructor()', function() {
    it('assigns params to respective attributes', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(
        rootModel,
        'test',
        'target',
        'pivot',
        'pivot_a',
        'pivot_b',
        'target_key',
        'root_key'
      )
      expect(relation['targetDefinition']).toEqual('target')
      expect(relation['pivot']).toEqual('pivot')
      expect(relation['pivotTargetKeyName']).toEqual('pivot_a')
      expect(relation['pivotRootKeyName']).toEqual('pivot_b')
      expect(relation['targetKeyName']).toEqual('target_key')
      expect(relation['rootKeyName']).toEqual('root_key')
    })
  })

  describe('.getType()', function() {
    it('returns a literally string "ManyToMany"', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      expect(relation.getType()).toEqual('ManyToMany')
    })
  })

  describe('get pivotModel()', function() {
    it('returns an property "pivotModelInstance" if there is a created instance', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      const pivot: any = {}
      relation['pivotModelInstance'] = pivot
      expect(relation['pivotModel'] === pivot).toBe(true)
    })

    it('calls .newPivot() then set the result to property "pivotModelInstance" if there is no created instance', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      const newPivotStub = Sinon.stub(relation, 'newPivot')
      newPivotStub.returns('anything')
      expect(newPivotStub.called).toBe(false)
      expect(relation['pivotModelInstance']).toBeUndefined()
      expect(relation['pivotModel']).toEqual('anything')
      expect(newPivotStub.called).toBe(true)
    })
  })

  describe('.newPivot()', function() {
    it('checks class in ClassRegistry, then use make() to makes and returns an instance if it is a Model', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      class ClassInRegistry {}
      register(ClassInRegistry, 'class-in-registry')

      const isModelStub = Sinon.stub(Helpers, 'isModel')
      isModelStub.returns(true)

      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'd', 'e', 'f', 'g')

      expect(relation.newPivot()).toBeInstanceOf(ClassInRegistry)
      expect(isModelStub.lastCall.args[0]).toBeInstanceOf(ClassInRegistry)
      expect(stub.called).toBe(false)
      stub.restore()
      isModelStub.restore()
    })

    it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot not in ClassRegistry', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'pivot', 'root_id', 'target_id', 'f', 'g')
      expect(relation.newPivot()).toBeInstanceOf(A)
      expect(relation['pivotDefinition'] === A).toBe(true)
      expect(
        stub.calledWith('pivot', {
          name: 'pivot',
          foreignKeys: ['root_id', 'target_id']
        })
      ).toBe(true)
      stub.restore()
    })

    it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot in ClassRegistry but not Model instance', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      class ClassInRegistry {}
      register(ClassInRegistry, 'class-in-registry')

      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'target_id', 'root_id', 'f', 'g')
      expect(relation.newPivot()).toBeInstanceOf(A)
      expect(relation['pivotDefinition'] === A).toBe(true)
      expect(
        stub.calledWith('class-in-registry', {
          name: 'class-in-registry',
          foreignKeys: ['root_id', 'target_id']
        })
      ).toBe(true)
      stub.restore()
    })

    it('simply calls and returns Reflect.construct(this.pivot) if the pivot is a Constructor function', function() {
      class A {}

      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', A as any, 'd', 'e', 'f', 'g')

      expect(relation.newPivot()).toBeInstanceOf(A)
    })

    it('can be created with data and isGuarded params', function() {
      class A {
        constructor(public data: object, public isGuarded: boolean) {}
      }

      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', A as any, 'd', 'e', 'f', 'g')

      const data = {}
      const pivot = relation.newPivot(data, false)
      expect(pivot).toBeInstanceOf(A)
      expect(pivot['data'] === data).toBe(true)
      expect(pivot['isGuarded']).toBe(false)
    })
  })

  describe('.getQueryBuilder()', function() {
    it('returns a queryBuilder from targetModel, which also contains the dataBucket of relation', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
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

    it('passes the queryBuilder to .applyCustomQuery() then returns the result', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
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

      const applyCustomQueryStub = Sinon.stub(relation, 'applyCustomQuery')
      applyCustomQueryStub.returns('anything')

      expect(relation.getQueryBuilder('name')).toEqual('anything')
      expect(newQuerySpy.calledWith('name')).toBe(true)
      expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true)
      expect(applyCustomQueryStub.calledWith(queryBuilder)).toBe(true)
    })
  })

  describe('.newPivotQuery()', function() {
    it('returns a new query of pivot by calls .pivotModel.newQuery(), it also set the relationDataBucket to queryBuilder', function() {
      const queryBuilder: any = {
        handler: {
          setRelationDataBucket() {}
        }
      }
      const pivotModel: any = {
        newQuery() {
          return queryBuilder
        }
      }

      const rootModel: any = {
        getAttribute() {
          return undefined
        }
      }
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relation['pivotModelInstance'] = pivotModel

      const dataBucket: any = {}
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket')
      const newQuerySpy = Sinon.spy(pivotModel, 'newQuery')

      expect(relation.newPivotQuery('name') === queryBuilder).toBe(true)
      expect(newQuerySpy.calledWith('name')).toBe(true)
      expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true)
    })

    it('link to rootModel if root model has primaryKey', function() {
      const queryBuilder: any = {
        handler: {
          setRelationDataBucket() {}
        },
        where() {
          return this
        }
      }
      const pivotModel: any = {
        newQuery() {
          return queryBuilder
        }
      }

      const whereSpy = Sinon.spy(queryBuilder, 'where')

      const rootModel: any = {
        getAttribute() {
          return 'value'
        }
      }
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'pivot_root_id', 'f', 'root-id')
      relation['pivotModelInstance'] = pivotModel

      const dataBucket: any = {}
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket')
      const newQuerySpy = Sinon.spy(pivotModel, 'newQuery')

      expect(relation.newPivotQuery('name') === queryBuilder).toBe(true)
      expect(whereSpy.calledWith('pivot_root_id', 'value')).toBe(true)
      expect(newQuerySpy.calledWith('name')).toBe(true)
      expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true)
    })

    it('does not link to rootModel if the second params is true', function() {
      const queryBuilder: any = {
        handler: {
          setRelationDataBucket() {}
        }
      }
      const pivotModel: any = {
        newQuery() {
          return queryBuilder
        }
      }

      const rootModel: any = {
        getAttribute() {
          return undefined
        }
      }
      const getAttributeSpy = Sinon.spy(rootModel, 'getAttribute')

      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relation['pivotModelInstance'] = pivotModel

      const dataBucket: any = {}
      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket')
      const newQuerySpy = Sinon.spy(pivotModel, 'newQuery')

      expect(relation.newPivotQuery('name', true) === queryBuilder).toBe(true)
      expect(getAttributeSpy.called).toBe(false)
      expect(newQuerySpy.calledWith('name')).toBe(true)
      expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true)
    })
  })

  describe('.attachByTargetId()', function() {
    it('create new pivot via .newPivot(), then set rootPrimaryKey to the pivotRootPrimaryKey & returns promise of Pivot.save()', async function() {
      const pivotModel: any = {
        setAttribute(name: any, value: any) {
          this[name] = value
        },
        async save() {
          return 'anything'
        }
      }
      const rootModel: any = {
        getAttribute() {
          return 'id'
        }
      }
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id')

      const newPivotStub = Sinon.stub(relation, 'newPivot')
      newPivotStub.returns(pivotModel)

      const result = relation.attachByTargetId('test')
      expect(pivotModel.pivot_target_id).toEqual('test')
      expect(pivotModel.pivot_root_id).toEqual('id')
      expect(isPromise(result)).toBe(true)
      expect(await result).toBe('anything')
    })

    it('returns undefined but already register to rootModel.once(saved) event to saved pivot in case rootModel has no id yet', async function() {
      const pivotModel: any = {
        setAttribute(name: any, value: any) {
          this[name] = value
        },
        async save() {
          return 'anything'
        }
      }
      const rootModel: any = {
        id: undefined,
        getAttribute() {
          return this.id
        },
        once() {}
      }
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id')

      const newPivotStub = Sinon.stub(relation, 'newPivot')
      newPivotStub.returns(pivotModel)

      const onceSpy = Sinon.spy(rootModel, 'once')
      const saveSpy = Sinon.spy(pivotModel, 'save')

      const result = relation.attachByTargetId('test')
      expect(result).toBeUndefined
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(pivotModel.pivot_target_id).toEqual('test')
      expect(pivotModel.pivot_root_id).toBeUndefined()

      expect(saveSpy.called).toBe(false)

      rootModel.id = 'new-id'
      const handler = onceSpy.lastCall.args[1]
      await handler()

      expect(pivotModel.pivot_target_id).toEqual('test')
      expect(pivotModel.pivot_root_id).toEqual('new-id')
      expect(saveSpy.called).toBe(true)
    })
  })

  describe('.collectPivotData()', function() {
    it('returns an empty object if there is no root primary key', function() {
      const rootModel: any = {
        getAttribute() {
          return undefined
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'Target', 'pivot', 'root_id', 'target_id', 'id', 'id')
      const dataBucket: any = {}
      expect(relation.collectPivotData(dataBucket)).toEqual({})
    })

    it('collects pivotModel in dataBucket which has "pivotRootKeyName" match with current rootPrimaryKey', function() {
      const dataBuffer = new DataBuffer('id', reader)
      dataBuffer.add({ id: '1', root_id: 1, target_id: 'x' })
      dataBuffer.add({ id: '2', root_id: 2, target_id: 'x' })
      dataBuffer.add({ id: '3', root_id: 1, target_id: 'y' })
      dataBuffer.add({ id: '4', root_id: 2, target_id: 'y' })
      const dataBucket: any = {
        getDataOf() {
          return dataBuffer
        }
      }

      const pivotModel: any = {}
      const rootModel: any = {
        getAttribute() {
          return 2
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'Target', 'pivot', 'target_id', 'root_id', 'id', 'id')

      relation['pivotModelInstance'] = pivotModel
      expect(relation.collectPivotData(dataBucket)).toEqual({
        x: { id: '2', root_id: 2, target_id: 'x' },
        y: { id: '4', root_id: 2, target_id: 'y' }
      })
    })
  })

  describe('.collectData()', function() {
    it('returns an empty collection if there is no dataBucket', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      const dataBucketStub = Sinon.stub(relation, 'getDataBucket')
      dataBucketStub.returns(undefined)

      const result = relation.collectData()
      expect(Helpers.isCollection(result)).toBe(true)
      expect(result!.all()).toEqual([])
    })

    it('calls .collectPivotData() first, then collect data of targetModel with "in" operator', function() {
      const dataBuffer = new DataBuffer('id', reader)
      dataBuffer.add({ id: 'x' })
      dataBuffer.add({ id: 'y' })
      dataBuffer.add({ id: 'z' })
      const dataBucket: any = {
        getDataOf() {
          return dataBuffer
        },
        makeCollection(model: any, data: any) {
          return data
        }
      }

      const targetModel: any = {}
      const rootModel: any = {
        getAttribute() {
          return 2
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'Target', 'pivot', 'target_id', 'root_id', 'id', 'id')
      relation['targetModelInstance'] = targetModel

      const dataBucketStub = Sinon.stub(relation, 'getDataBucket')
      dataBucketStub.returns(dataBucket)

      const collectPivotDataStub = Sinon.stub(relation, 'collectPivotData')
      collectPivotDataStub.returns({
        x: { id: '2', root_id: 2, target_id: 'x' },
        y: { id: '4', root_id: 2, target_id: 'y' }
      })

      expect(relation.collectData()).toEqual([{ id: 'x' }, { id: 'y' }])
    })
  })

  describe('.fetchPivotData()', function() {
    it('simply calls and return .newPivotQuery() with get when the type is "lazy"', async function() {
      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'e', 'f', 'g')
      relation['targetModelInstance'] = targetModel

      const query = {
        get() {
          return Promise.resolve('anything')
        }
      }
      const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery')
      newPivotQueryStub.returns(query)

      const result = await relation.fetchPivotData('lazy')
      expect(result).toEqual('anything')
      expect(newPivotQueryStub.calledWith('ManyToManyPivot:Target-Root')).toBe(true)
    })

    it('returns an empty collection if type is "eager", but there is not dataBucket', async function() {
      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'e', 'f', 'g')
      relation['targetModelInstance'] = targetModel

      const query = {
        get() {
          return Promise.resolve('anything')
        }
      }
      const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery')
      newPivotQueryStub.returns(query)

      const dataBucketStub = Sinon.stub(relation, 'getDataBucket')
      dataBucketStub.returns(undefined)

      const result = await relation.fetchPivotData('eager')
      expect(Helpers.isCollection(result)).toBe(true)
      expect(result.all()).toEqual([])
    })

    it('calls .newPivotQuery() with raw = true, then use RelationUtilities.getAttributeListInDataBucket() to get a list of id for querying with .whereIn()', async function() {
      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'pivot_root_id', 'f', 'root-key')
      relation['targetModelInstance'] = targetModel

      const query = {
        whereIn() {
          return this
        },

        get() {
          return Promise.resolve('anything')
        }
      }
      const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery')
      newPivotQueryStub.returns(query)

      const dataBucket = {}
      const dataBucketStub = Sinon.stub(relation, 'getDataBucket')
      dataBucketStub.returns(dataBucket)

      const getAttributeListInDataBucketStub = Sinon.stub(RelationUtilities, 'getAttributeListInDataBucket')
      getAttributeListInDataBucketStub.returns([1, 2])

      const whereInSpy = Sinon.spy(query, 'whereIn')

      const result = await relation.fetchPivotData('eager')
      expect(whereInSpy.calledWith('pivot_root_id', [1, 2]))
      expect(getAttributeListInDataBucketStub.calledWith(dataBucket, rootModel, 'root-key')).toBe(true)
      expect(result).toEqual('anything')
    })
  })

  describe('.fetchData()', function() {
    it('calls .fetchPivotData() to get pivot data, then use query from getQueryBuilder to find targets via .whereIn()', async function() {
      const targetModel: any = {
        getModelName() {
          return 'Target'
        }
      }
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const relation = new ManyToMany(rootModel, 'name', 'target', 'pivot', 'target_id', 'root_id', 'id', 'id')
      const stub = Sinon.stub(relation, 'fetchPivotData')

      const recordA = new Record({ target_id: 1, root_id: 1 })
      const recordB = new Record({ target_id: 2, root_id: 1 })
      stub.returns(make_collection([recordA, recordB]))

      const query = {
        whereIn() {
          return this
        },
        get() {
          return Promise.resolve('anything')
        }
      }
      const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder')
      getQueryBuilderStub.returns(query)

      relation['targetModelInstance'] = targetModel

      const whereInSpy = Sinon.spy(query, 'whereIn')

      const result = await relation.fetchData('lazy')
      expect(result).toEqual('anything')
      expect(getQueryBuilderStub.calledWith('ManyToMany:Target-Root')).toBe(true)
      expect(whereInSpy.calledWith('id', [1, 2])).toBe(true)
    })
  })

  // TODO: implementation needed
  describe('.isInverseOf()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relation.isInverseOf({} as any)
    })
  })

  // TODO: implementation another cases
  describe('.attach()', function() {
    it('calls .attachByTargetId() and returns this in case the result is undefined', async function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id')
      const attachByTargetIdStub = Sinon.stub(relation, 'attachByTargetId')
      attachByTargetIdStub.returns(undefined)

      expect((await relation.attach('id')) === relation).toBe(true)
      expect(attachByTargetIdStub.calledWith('id')).toBe(true)
    })

    it('resolve .attachByTargetId() result and returns this in case the result is a promise', async function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id')

      const promiseHandler = Sinon.spy(() => {})
      const attachByTargetIdStub = Sinon.stub(relation, 'attachByTargetId')
      attachByTargetIdStub.returns(
        new Promise(resolve => {
          setTimeout(function() {
            promiseHandler()
            resolve(true)
          }, 300)
        })
      )

      expect(promiseHandler.called).toBe(false)
      expect((await relation.attach('id')) === relation).toBe(true)
      expect(attachByTargetIdStub.calledWith('id')).toBe(true)
      expect(promiseHandler.called).toBe(true)
    })
  })
})
