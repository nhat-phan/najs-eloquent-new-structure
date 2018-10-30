import 'jest'
import * as Sinon from 'sinon'
import * as Helpers from '../../../lib/util/helpers'
import { MorphMany } from '../../../lib/relations/relationships/MorphMany'
import { HasOneOrMany } from '../../../lib/relations/relationships/HasOneOrMany'
import { Relationship } from '../../../lib/relations/Relationship'
import { RelationshipType } from '../../../lib/relations/RelationshipType'
import { MorphManyExecutor } from '../../../lib/relations/relationships/executors/MorphManyExecutor'

describe('HasMany', function() {
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
})
