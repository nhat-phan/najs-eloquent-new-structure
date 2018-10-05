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
})
