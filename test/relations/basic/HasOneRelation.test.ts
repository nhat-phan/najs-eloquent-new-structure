import 'jest'
import { HasOneRelation } from '../../../lib/relations/basic/HasOneRelation'
import { Relation } from '../../../lib/relations/Relation'

describe('HasOne', function() {
  it('extends Relation and implements Autoload under name "NajsEloquent.Relation.HasOneRelation"', function() {
    const rootModel: any = {}
    const hasOne = new HasOneRelation(rootModel, 'test')

    expect(hasOne).toBeInstanceOf(Relation)
    expect(hasOne.getClassName()).toEqual('NajsEloquent.Relation.HasOneRelation')
  })

  describe('.getType()', function() {
    it('returns literal string "HasOne"', function() {
      const rootModel: any = {}
      const hasOne = new HasOneRelation(rootModel, 'test')
      expect(hasOne.getType()).toEqual('HasOne')
    })
  })

  describe('.collectData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const hasOne = new HasOneRelation(rootModel, 'test')
      hasOne.collectData()
    })
  })

  describe('.fetch()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const hasOne = new HasOneRelation(rootModel, 'test')
      hasOne.fetchData('eager')
    })
  })

  describe('.isInverseOf()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const hasOne = new HasOneRelation(rootModel, 'test')
      hasOne.isInverseOf(hasOne)
    })
  })
})
