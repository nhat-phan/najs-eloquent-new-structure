import 'jest'
import * as Sinon from 'sinon'
import { register } from 'najs-binding'
import * as Helpers from '../../../lib/util/helpers'
import { Relationship } from '../../../lib/relations/Relationship'
import { ManyToMany } from '../../../lib/relations/relationships/ManyToMany'
import { PivotModel } from './../../../lib/relations/relationships/pivot/PivotModel'

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

  describe('get pivotModel()', function() {
    it('returns an property "pivotModelInstance" if there is a created instance', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      const pivot: any = {}
      relationship['pivotModelInstance'] = pivot
      expect(relationship['pivotModel'] === pivot).toBe(true)
    })

    it('calls .getPivotModel() then set the result to property "pivotModelInstance" if there is no created instance', function() {
      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g')
      const getPivotModelStub = Sinon.stub(relationship, 'getPivotModel')
      getPivotModelStub.returns('anything')
      expect(getPivotModelStub.called).toBe(false)
      expect(relationship['pivotModelInstance']).toBeUndefined()
      expect(relationship['pivotModel']).toEqual('anything')
      expect(getPivotModelStub.called).toBe(true)
    })
  })

  describe('.getPivotModel()', function() {
    it('checks class in ClassRegistry, then use make() to makes and returns an instance if it is a Model', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      class ClassInRegistry {}
      register(ClassInRegistry, 'class-in-registry')

      const isModelStub = Sinon.stub(Helpers, 'isModel')
      isModelStub.returns(true)

      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'd', 'e', 'f', 'g')

      expect(relationship.getPivotModel()).toBeInstanceOf(ClassInRegistry)
      expect(isModelStub.lastCall.args[0]).toBeInstanceOf(ClassInRegistry)
      expect(stub.called).toBe(false)
      stub.restore()
      isModelStub.restore()
    })

    it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot not in ClassRegistry', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'pivot', 'd', 'e', 'f', 'g')
      expect(relationship.getPivotModel()).toBeInstanceOf(A)
      expect(relationship['pivotDefinition'] === A).toBe(true)
      expect(stub.calledWith('pivot')).toBe(true)
      stub.restore()
    })

    it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot in ClassRegistry but not Model instance', function() {
      class A {}
      const stub = Sinon.stub(PivotModel, 'createPivotClass')
      stub.returns(A)

      class ClassInRegistry {}
      register(ClassInRegistry, 'class-in-registry')

      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'd', 'e', 'f', 'g')
      expect(relationship.getPivotModel()).toBeInstanceOf(A)
      expect(relationship['pivotDefinition'] === A).toBe(true)
      expect(stub.calledWith('class-in-registry')).toBe(true)
      stub.restore()
    })

    it('simply calls and returns Reflect.construct(this.pivot) if the pivot is a Constructor function', function() {
      class A {}

      const rootModel: any = {}
      const relationship = new ManyToMany(rootModel, 'a', 'b', A as any, 'd', 'e', 'f', 'g')

      expect(relationship.getPivotModel()).toBeInstanceOf(A)
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
