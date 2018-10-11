import 'jest'
import * as Sinon from 'sinon'
import { HasMany } from '../../../lib/relations/relationships/HasMany'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'
import { isCollection } from '../../../lib/util/helpers'

describe('HasOne', function() {
  it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.HasManyRelation"', function() {
    const rootModel: any = {}
    const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')
    expect(hasMany).toBeInstanceOf(HasOneOrMany)
    expect(hasMany).toBeInstanceOf(Relationship)
    expect(hasMany.getClassName()).toEqual('NajsEloquent.Relation.Relationship.HasMany')
  })

  describe('.getType()', function() {
    it('returns literal string "HasMany"', function() {
      const rootModel: any = {}
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')
      expect(hasMany.getType()).toEqual(RelationshipType.HasMany)
    })
  })

  describe('.executeCollector()', function() {
    it('calls collector.exec(), then create a Collection by DataBucket.makeCollection() with the result', function() {
      const collector: any = {
        limit() {},
        exec() {}
      }
      const execStub = Sinon.stub(collector, 'exec')

      const itemOne = {}
      const itemTwo = {}
      const result = [itemOne, itemTwo]
      execStub.returns(result)

      const rootModel: any = {}
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')

      const targetModel: any = {}
      hasMany['targetModelInstance'] = targetModel
      const dataBucket: any = {
        makeCollection(target: any, data: any) {
          return data
        }
      }
      const getDataBucketStub = Sinon.stub(hasMany, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const spy = Sinon.spy(dataBucket, 'makeCollection')

      expect((hasMany.executeCollector(collector) as any) === result).toBe(true)
      expect(execStub.calledWith()).toBe(true)
      expect(spy.calledWith(targetModel, [itemOne, itemTwo])).toBe(true)
    })
  })

  describe('.executeQuery()', function() {
    it('returns query.get()', async function() {
      const rootModel: any = {}
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')
      const query: any = {
        async get() {
          return 'anything'
        }
      }
      expect(await hasMany.executeQuery(query)).toBe('anything')
    })
  })

  describe('.getEmptyValue()', function() {
    it('returns empty collection', function() {
      const rootModel: any = {}
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')
      expect(isCollection(hasMany.getEmptyValue())).toBe(true)
    })
  })

  describe('.associate()', function() {
    it('is chainable, sets targetKeyName with key get from root model, then save the model when root model get saved', async function() {
      const rootModel: any = {
        getAttribute() {
          return 'anything'
        },

        once() {}
      }

      const model1: any = {
        setAttribute() {},
        save() {
          return Promise.resolve(true)
        }
      }
      const model2: any = {
        setAttribute() {},
        save() {
          return Promise.resolve(true)
        }
      }
      const model3: any = {
        setAttribute() {},
        save() {
          return Promise.resolve(true)
        }
      }
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')

      const onceSpy = Sinon.spy(rootModel, 'once')

      const setAttribute1Spy = Sinon.spy(model1, 'setAttribute')
      const setAttribute2Spy = Sinon.spy(model2, 'setAttribute')
      const setAttribute3Spy = Sinon.spy(model3, 'setAttribute')
      const save1Spy = Sinon.spy(model1, 'save')
      const save2Spy = Sinon.spy(model2, 'save')
      const save3Spy = Sinon.spy(model3, 'save')

      expect(hasMany.associate(model1, [model2, model3]) === hasMany).toBe(true)
      expect(setAttribute1Spy.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute2Spy.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute3Spy.calledWith('target_id', 'anything')).toBe(true)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(save1Spy.called).toBe(false)
      expect(save2Spy.called).toBe(false)
      expect(save3Spy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(save1Spy.called).toBe(true)
      expect(save2Spy.called).toBe(true)
      expect(save3Spy.called).toBe(true)
    })

    it('is chainable, sets targetKeyName after root model get saved if the key in rootModel is not found', function() {
      const rootModel: any = {
        getAttribute() {
          return undefined
        },
        once() {}
      }

      const model1: any = {
        setAttribute() {
          return this
        },
        save() {
          return Promise.resolve(true)
        }
      }
      const model2: any = {
        setAttribute() {
          return this
        },
        save() {
          return Promise.resolve(true)
        }
      }
      const model3: any = {
        setAttribute() {
          return this
        },
        save() {
          return Promise.resolve(true)
        }
      }
      const hasMany = new HasMany(rootModel, 'test', 'Target', 'target_id', 'id')

      const onceSpy = Sinon.spy(rootModel, 'once')

      const setAttribute1Spy = Sinon.spy(model1, 'setAttribute')
      const setAttribute2Spy = Sinon.spy(model2, 'setAttribute')
      const setAttribute3Spy = Sinon.spy(model3, 'setAttribute')
      const save1Spy = Sinon.spy(model1, 'save')
      const save2Spy = Sinon.spy(model2, 'save')
      const save3Spy = Sinon.spy(model3, 'save')

      expect(hasMany.associate([model1, model2, model3]) === hasMany).toBe(true)
      expect(setAttribute1Spy.called).toBe(false)
      expect(setAttribute2Spy.called).toBe(false)
      expect(setAttribute3Spy.called).toBe(false)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(save1Spy.called).toBe(false)
      expect(save2Spy.called).toBe(false)
      expect(save3Spy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(save1Spy.called).toBe(true)
      expect(save2Spy.called).toBe(true)
      expect(save3Spy.called).toBe(true)
      expect(setAttribute1Spy.called).toBe(true)
      expect(setAttribute2Spy.called).toBe(true)
      expect(setAttribute3Spy.called).toBe(true)
    })
  })
})
