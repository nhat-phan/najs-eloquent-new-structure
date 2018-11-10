import 'jest'
import * as Sinon from 'sinon'
import * as Helpers from '../../../lib/util/helpers'
import { MorphMany } from '../../../lib/relations/relationships/MorphMany'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'
import { MorphManyExecutor } from '../../../lib/relations/relationships/executors/MorphManyExecutor'
import { make_collection } from '../../../lib/util/factory'
import { RelationUtilities } from '../../../lib/relations/RelationUtilities'

describe('MorphMany', function() {
  it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.MorphMany"', function() {
    const rootModel: any = {}
    const morphMany = new MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
    expect(morphMany).toBeInstanceOf(HasOneOrMany)
    expect(morphMany).toBeInstanceOf(Relationship)
    expect(morphMany.getClassName()).toEqual('NajsEloquent.Relation.Relationship.MorphMany')
  })

  describe('.getType()', function() {
    it('returns literal string "MorphMany"', function() {
      const rootModel: any = {}
      const morphMany = new MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
      expect(morphMany.getType()).toEqual(RelationshipType.MorphMany)
    })
  })

  describe('.getExecutor()', function() {
    it('returns an cached instance of MorphManyExecutor in property "executor"', function() {
      const isModelStub = Sinon.stub(Helpers, 'isModel')
      const findMorphTypeSpy = Sinon.spy(Relationship, 'findMorphType')
      isModelStub.returns(true)
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const morphMany = new MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
      morphMany['targetModelInstance'] = {} as any
      const getDataBucketStub = Sinon.stub(morphMany, 'getDataBucket')
      getDataBucketStub.returns({})

      expect(morphMany.getExecutor()).toBeInstanceOf(MorphManyExecutor)
      expect(morphMany.getExecutor()['targetMorphTypeName']).toEqual('target_type')
      expect(morphMany.getExecutor()['morphTypeValue']).toEqual('Root')
      expect(morphMany.getExecutor() === morphMany['executor']).toBe(true)
      expect(findMorphTypeSpy.calledWith(rootModel)).toBe(true)
      findMorphTypeSpy.restore()
      isModelStub.restore()
    })
  })

  describe('.associate()', function() {
    it('is chainable, calls RelationUtilities.associateMany() with a setTargetAttributes which sets targetKeyName and targetMorphTypeName to target model', function() {
      const stub = Sinon.stub(MorphMany, 'findMorphType')
      stub.returns('MorphType')

      const rootModel: any = {
        getAttribute() {
          return 'anything'
        },

        getModelName() {
          return 'ModelName'
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
      const model4: any = {
        setAttribute() {},
        save() {
          return Promise.resolve(true)
        }
      }

      const hasMany = new MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
      const setAttribute1Spy = Sinon.spy(model1, 'setAttribute')
      const setAttribute2Spy = Sinon.spy(model2, 'setAttribute')
      const setAttribute3Spy = Sinon.spy(model3, 'setAttribute')
      const setAttribute4Spy = Sinon.spy(model4, 'setAttribute')

      const spy = Sinon.spy(RelationUtilities, 'associateMany')

      expect(hasMany.associate(model1, [model2], make_collection<any>([model3, model4])) === hasMany).toBe(true)
      expect(stub.calledWith('ModelName')).toBe(true)
      expect(spy.calledWith([model1, [model2], make_collection<any>([model3, model4])], rootModel, 'id')).toBe(true)
      expect(setAttribute1Spy.firstCall.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute1Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true)
      expect(setAttribute2Spy.firstCall.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute2Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true)
      expect(setAttribute3Spy.firstCall.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute3Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true)
      expect(setAttribute4Spy.firstCall.calledWith('target_id', 'anything')).toBe(true)
      expect(setAttribute4Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true)

      stub.restore()
    })
  })
})
