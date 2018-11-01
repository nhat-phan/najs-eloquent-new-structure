import 'jest'
import * as Sinon from 'sinon'
import * as Helpers from '../../../lib/util/helpers'
import { MorphOne } from '../../../lib/relations/relationships/MorphOne'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'
import { MorphOneExecutor } from '../../../lib/relations/relationships/executors/MorphOneExecutor'

describe('MorphOne', function() {
  it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.MorphOne"', function() {
    const rootModel: any = {}
    const morphOne = new MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
    expect(morphOne).toBeInstanceOf(HasOneOrMany)
    expect(morphOne).toBeInstanceOf(Relationship)
    expect(morphOne.getClassName()).toEqual('NajsEloquent.Relation.Relationship.MorphOne')
  })

  describe('.getType()', function() {
    it('returns literal string "MorphOne"', function() {
      const rootModel: any = {}
      const morphOne = new MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
      expect(morphOne.getType()).toEqual(RelationshipType.MorphOne)
    })
  })

  describe('.getExecutor()', function() {
    it('returns an cached instance of MorphOneExecutor in property "executor"', function() {
      const isModelStub = Sinon.stub(Helpers, 'isModel')
      const findMorphTypeSpy = Sinon.spy(Relationship, 'findMorphType')
      isModelStub.returns(true)
      const rootModel: any = {
        getModelName() {
          return 'Root'
        }
      }
      const morphOne = new MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id')
      morphOne['targetModelInstance'] = {} as any
      const getDataBucketStub = Sinon.stub(morphOne, 'getDataBucket')
      getDataBucketStub.returns({})

      expect(morphOne.getExecutor()).toBeInstanceOf(MorphOneExecutor)
      expect(morphOne.getExecutor()['targetMorphTypeName']).toEqual('target_type')
      expect(morphOne.getExecutor()['morphTypeValue']).toEqual('Root')
      expect(morphOne.getExecutor() === morphOne['executor']).toBe(true)
      expect(findMorphTypeSpy.calledWith(rootModel)).toBe(true)
      findMorphTypeSpy.restore()
      isModelStub.restore()
    })
  })
})