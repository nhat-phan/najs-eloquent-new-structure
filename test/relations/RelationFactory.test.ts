import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { RelationFactory } from '../../lib/relations/RelationFactory'

describe('RelationFactory', function() {
  describe('constructor()', function() {
    it('assigns rootModel & name from params to properties', function() {
      const rootModel: any = {}
      const factory = new RelationFactory(rootModel, 'test')
      expect(factory['rootModel'] === rootModel).toBe(true)
      expect(factory['name']).toEqual('test')
    })
  })

  describe('.make()', function() {
    it('creates an relation via make(), then calls modifier if provided', function() {
      const modifierContainer = {
        modifier() {}
      }
      const modifierSpy = Sinon.spy(modifierContainer, 'modifier')
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns('anything')

      const a = {}
      const b = {}
      const rootModel: any = {}
      const factory = new RelationFactory(rootModel, 'test')
      factory.make('Test', [a, b], modifierContainer.modifier)

      expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true)
      expect(modifierSpy.calledWith('anything')).toBe(true)
      expect(factory['relation']).toEqual('anything')
      makeStub.restore()
    })

    it('does not call modifier if not provided', function() {
      const modifierContainer = {
        modifier() {}
      }
      const modifierSpy = Sinon.spy(modifierContainer, 'modifier')
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns('anything')

      const a = {}
      const b = {}
      const rootModel: any = {}
      const factory = new RelationFactory(rootModel, 'test')
      factory.make('Test', [a, b])

      expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true)
      expect(modifierSpy.calledWith('anything')).toBe(false)
      expect(factory['relation']).toEqual('anything')
      makeStub.restore()
    })

    it('just returns the relation if it already exist', function() {
      const modifierContainer = {
        modifier() {}
      }
      const modifierSpy = Sinon.spy(modifierContainer, 'modifier')
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns('anything')

      const a = {}
      const b = {}
      const rootModel: any = {}
      const factory = new RelationFactory(rootModel, 'test')
      factory.make('Test', [a, b], modifierContainer.modifier)
      factory.make('Test', [a, b], modifierContainer.modifier)

      expect(makeStub.calledOnce).toBe(true)
      expect(modifierSpy.calledOnce).toBe(true)
      expect(factory['relation']).toEqual('anything')
      makeStub.restore()
    })
  })

  describe('.findForeignKeyName()', function() {
    it('returns ReferencedModel + "Id" which is formatted by ReferencingModel.formatAttributeName()', function() {
      const referencing = 'Referencing'
      const referencingModel: any = {
        formatAttributeName(name: string) {
          return name + '<formatted>'
        }
      }
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns(referencingModel)

      const dataset = [
        { name: 'Test', output: 'Test_id<formatted>' },
        { name: 'Namespace.Test', output: 'Test_id<formatted>' },
        { name: 'Long.Namespace.Test', output: 'Test_id<formatted>' }
      ]

      for (const data of dataset) {
        const rootModel: any = {
          getModelName() {
            return data.name
          }
        }
        const factory = new RelationFactory(rootModel, 'test')
        const result = factory.findForeignKeyName(referencing, rootModel)
        expect(result).toEqual(data.output)
        expect(makeStub.calledWith(referencing)).toBe(true)
        makeStub.resetHistory()
      }

      makeStub.restore()
    })
  })

  describe('.hasOne()', function() {
    it('calls .make() with class "NajsEloquent.Relation.HasOneRelation"', function() {
      const rootModel: any = {
        getPrimaryKeyName() {
          return 'id'
        }
      }
      const factory = new RelationFactory(rootModel, 'test')

      const makeStub = Sinon.stub(factory, 'make')
      makeStub.returns('anything')

      const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName')
      findTargetKeyNameStub.returns('test')

      expect(factory.hasOne('Target', 'target_id', 'id')).toEqual('anything')
      expect(findTargetKeyNameStub.called).toBe(false)
      expect(makeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'target_id', 'id'])).toBe(true)
    })

    it('calls .findForeignKeyName() to find targetKey if the targetKey is not found', function() {
      const rootModel: any = {
        getPrimaryKeyName() {
          return 'id'
        }
      }
      const factory = new RelationFactory(rootModel, 'test')

      const makeStub = Sinon.stub(factory, 'make')
      makeStub.returns('anything')

      const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName')
      findTargetKeyNameStub.returns('found_target_id')

      expect(factory.hasOne('Target', undefined, 'id')).toEqual('anything')
      expect(findTargetKeyNameStub.calledWith('Target', rootModel)).toBe(true)
      expect(
        makeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'found_target_id', 'id'])
      ).toBe(true)
    })

    it('calls .findForeignKeyName() to find targetKey if the targetKey is not found', function() {
      const rootModel: any = {
        getPrimaryKeyName() {
          return 'found_id'
        }
      }
      const factory = new RelationFactory(rootModel, 'test')

      const makeStub = Sinon.stub(factory, 'make')
      makeStub.returns('anything')

      expect(factory.hasOne('Target', 'target_id')).toEqual('anything')
      expect(
        makeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'target_id', 'found_id'])
      ).toBe(true)
    })
  })
})
