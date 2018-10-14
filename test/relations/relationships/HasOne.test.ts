import 'jest'
import * as Sinon from 'sinon'
import { HasOne } from '../../../lib/relations/relationships/HasOne'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'
import { OneRowExecutor } from '../../../lib/relations/relationships/executors/OneRowExecutor'

describe('HasOne', function() {
  it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.HasOne"', function() {
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

  describe('.getExecutor()', function() {
    it('returns an cached instance of ManyRowsExecutor in property "executor"', function() {
      const rootModel: any = {}
      const hasOne = new HasOne(rootModel, 'test', 'Target', 'target_id', 'id')
      hasOne['targetModelInstance'] = {} as any
      const getDataBucketStub = Sinon.stub(hasOne, 'getDataBucket')
      getDataBucketStub.returns({})

      expect(hasOne.getExecutor()).toBeInstanceOf(OneRowExecutor)
      expect(hasOne.getExecutor() === hasOne['executor']).toBe(true)
    })
  })

  describe('.associate()', function() {
    it('is NOT chainable, sets targetKeyName with key get from root model, then save the model when root model get saved', async function() {
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

      expect(hasOne.associate(model)).toBeUndefined()
      expect(setAttributeSpy.calledWith('target_id', 'anything')).toBe(true)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(saveSpy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(saveSpy.called).toBe(true)
    })

    it('is NOT chainable, sets targetKeyName after root model get saved if the key in rootModel is not found', function() {
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

      expect(hasOne.associate(model)).toBeUndefined()
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
