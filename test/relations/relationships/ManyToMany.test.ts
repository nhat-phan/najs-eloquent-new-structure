import 'jest'
// import * as Sinon from 'sinon'
import { Relationship } from '../../../lib/relations/Relationship'
import { ManyToMany } from '../../../lib/relations/relationships/ManyToMany'

describe('ManyToMany', function() {
  it('extends Relationship class and implements Autoload under name "NajsEloquent.Relation.Relationship.ManyToMany"', function() {
    const rootModel: any = {}
    const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
    expect(relationship).toBeInstanceOf(Relationship)
    expect(relationship.getClassName()).toEqual('NajsEloquent.Relation.Relationship.ManyToMany')
  })

  describe('constructor()', function() {
    it('assigns params to respective attributes', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(
        rootModel,
        'test',
        'target',
        'pivot',
        'pivot_a',
        'pivot_b',
        'target_key',
        'root_key'
      )
      expect(relationship['targetDefinition']).toEqual('target')
      expect(relationship['pivot']).toEqual('pivot')
      expect(relationship['pivotTargetKeyName']).toEqual('pivot_a')
      expect(relationship['pivotRootKeyName']).toEqual('pivot_b')
      expect(relationship['targetKeyName']).toEqual('target_key')
      expect(relationship['rootKeyName']).toEqual('root_key')
    })
  })

  describe('.getType()', function() {
    it('returns a literally string "ManyToMany"', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      expect(relationship.getType()).toEqual('ManyToMany')
    })
  })

  // TODO: implementation needed
  describe('.collectData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relationship.collectData()
    })
  })

  // TODO: implementation needed
  describe('.fetchData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relationship.fetchData('lazy')
    })
  })

  // TODO: implementation needed
  describe('.isInverseOf()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      relationship.isInverseOf({} as any)
    })
  })
})
