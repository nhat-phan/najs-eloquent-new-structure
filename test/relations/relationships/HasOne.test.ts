import 'jest'
import * as Sinon from 'sinon'
import { HasOne } from '../../../lib/relations/relationships/HasOne'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'

describe('HasOne', function() {
  it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.HasOneRelation"', function() {
    const rootModel: any = {}
    const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
    expect(hasOne).toBeInstanceOf(HasOneOrMany)
    expect(hasOne).toBeInstanceOf(Relationship)
    expect(hasOne.getClassName()).toEqual('NajsEloquent.Relation.Relationship.HasOne')
  })

  describe('.getType()', function() {
    it('returns literal string "HasOne"', function() {
      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
      expect(hasOne.getType()).toEqual(RelationshipType.HasOne)
    })
  })

  describe('.executeCollector()', function() {
    it('calls collector.limit(1) then exec() and returns undefined if there is no result', function() {
      const collector: any = {
        limit() {},
        exec() {}
      }
      const limitSpy = Sinon.spy(collector, 'limit')
      const execStub = Sinon.stub(collector, 'exec')

      execStub.returns([])
      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
      expect(hasOne.executeCollector(collector)).toBeUndefined()
      expect(limitSpy.calledWith(1)).toBe(true)
      expect(execStub.calledWith()).toBe(true)
    })

    it('calls collector.limit(1) then exec(), then create a Model by DataBucket.makeModel() with the first item of result', function() {
      const collector: any = {
        limit() {},
        exec() {}
      }
      const limitSpy = Sinon.spy(collector, 'limit')
      const execStub = Sinon.stub(collector, 'exec')

      const itemOne = {}
      const itemTwo = {}
      execStub.returns([itemOne, itemTwo])

      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')

      const targetModel: any = {}
      hasOne['targetModelInstance'] = targetModel
      const dataBucket: any = {
        makeModel(target: any, data: any) {
          return data
        }
      }
      const getDataBucketStub = Sinon.stub(hasOne, 'getDataBucket')
      getDataBucketStub.returns(dataBucket)

      const spy = Sinon.spy(dataBucket, 'makeModel')

      expect(hasOne.executeCollector(collector) === itemOne).toBe(true)
      expect(limitSpy.calledWith(1)).toBe(true)
      expect(execStub.calledWith()).toBe(true)
      expect(spy.calledWith(targetModel, itemOne)).toBe(true)
    })
  })

  describe('.executeQuery()', function() {
    it('returns query.first()', async function() {
      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
      const query: any = {
        async first() {
          return 'anything'
        }
      }
      expect(await hasOne.executeQuery(query)).toBe('anything')
    })
  })

  describe('.getEmptyValue()', function() {
    it('returns undefined', function() {
      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
      expect(hasOne.getEmptyValue()).toBeUndefined()
    })
  })

  describe('.associate()', function() {
    it('sets targetKeyName with key get from root model, then save the model when root model get saved', async function() {
      const rootModel: any = {
        getAttribute() {
          return 'anything'
        },

        once() {}
      }

      const model: any = {
        setAttribute() {},

        save() {
          return Promise.resolve(true)
        }
      }
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')

      const setAttributeSpy = Sinon.spy(model, 'setAttribute')
      const onceSpy = Sinon.spy(rootModel, 'once')
      const saveSpy = Sinon.spy(model, 'save')

      hasOne.associate(model)
      expect(setAttributeSpy.calledWith('target_id', 'anything')).toBe(true)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(saveSpy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(saveSpy.called).toBe(true)
    })

    it('sets targetKeyName after root model get saved if the key in rootModel is not found', function() {
      const rootModel: any = {
        getAttribute() {
          return undefined
        },

        once() {}
      }

      const model: any = {
        setAttribute() {},

        save() {
          return Promise.resolve(true)
        }
      }
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')

      const setAttributeSpy = Sinon.spy(model, 'setAttribute')
      const onceSpy = Sinon.spy(rootModel, 'once')
      const saveSpy = Sinon.spy(model, 'save')

      hasOne.associate(model)
      expect(setAttributeSpy.called).toBe(false)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(saveSpy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(saveSpy.called).toBe(true)
      expect(setAttributeSpy.called).toBe(true)
    })
  })
})
