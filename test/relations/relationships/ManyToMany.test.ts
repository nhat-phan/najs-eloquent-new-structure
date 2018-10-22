import 'jest'
import * as Sinon from 'sinon'
import { register } from 'najs-binding'
import * as Helpers from '../../../lib/util/helpers'
import { Relationship } from '../../../lib/relations/Relationship'
import { ManyToMany } from '../../../lib/relations/relationships/ManyToMany'
import { PivotModel } from './../../../lib/relations/relationships/pivot/PivotModel'
import { isPromise } from '../../../lib/util/isPromise'

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

  // TODO: implementation needed
  describe('.collectData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relation.collectData()
    })
  })

  // TODO: implementation needed
  describe('.fetchData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      // const stub = Sinon.stub(relation, 'fetchPivotData')
      // stub.returns('anything')
      relation.fetchData('lazy')
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
})
