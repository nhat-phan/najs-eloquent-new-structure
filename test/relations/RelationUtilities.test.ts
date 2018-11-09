import 'jest'
import * as Sinon from 'sinon'
import { Relationship } from './../../lib/relations/Relationship'
import { RelationUtilities } from './../../lib/relations/RelationUtilities'
import { DataBuffer } from '../../lib/data/DataBuffer'

const reader = {
  getAttribute(data: object, field: string) {
    return data[field]
  },

  pick(data: object, fields: string[]) {
    return data
  },

  toComparable(value: any) {
    return value
  }
}

describe('RelationUtilities', function() {
  describe('.bundleRelations()', function() {
    it('reduces and groups relation by name, in case it already exist the chains will be passed to previous relation via .with()', function() {
      function make_relation(name: string, chains: string[]): Relationship<any> {
        const instance = Reflect.construct(Relationship, [{}, name])
        instance['name'] = name
        instance['chains'] = chains
        return instance
      }

      const one = make_relation('one', ['test'])
      const two = make_relation('two', [])
      const three = make_relation('three', ['*', 'x'])
      const four = make_relation('one', ['a'])
      const five = make_relation('one', ['b', 'a'])
      const six = make_relation('two', [])
      const seven = make_relation('three', ['x'])

      const result = RelationUtilities.bundleRelations([one, two, three, four, five, six, seven])
      expect(result[0] === one).toBe(true)
      expect(result[1] === two).toBe(true)
      expect(result[2] === three).toBe(true)
      expect(one.getChains()).toEqual(['test', 'a', 'b'])
      expect(two.getChains()).toEqual([])
      expect(three.getChains()).toEqual(['*', 'x'])
    })
  })

  describe('.isLoadedInDataBucket()', function() {
    it('does nothing and returns false if there is no dataBucket in relation', function() {
      const model: any = {}
      const relation: any = {
        getDataBucket() {
          return undefined
        }
      }

      expect(RelationUtilities.isLoadedInDataBucket(relation, model, 'test')).toBe(false)
    })

    it('returns false if the name is not in array DataBucket.metadata."loaded"', function() {
      const dataset = [
        {
          metadata: { loaded: [] },
          name: 'a',
          result: false
        },
        {
          metadata: { loaded: ['a'] },
          name: 'a',
          result: true
        },
        {
          metadata: { loaded: ['a'] },
          name: 'b',
          result: false
        }
      ]

      for (const item of dataset) {
        const model: any = {}
        const relation: any = {
          getDataBucket() {
            return {
              getMetadataOf() {
                return item.metadata
              }
            }
          }
        }

        expect(RelationUtilities.isLoadedInDataBucket(relation, model, item.name)).toBe(item.result)
      }
    })
  })

  describe('.markLoadedInDataBucket()', function() {
    it('does nothing if there is no dataBucket in relation', function() {
      const model: any = {}
      const relation: any = {
        getDataBucket() {
          return undefined
        }
      }

      RelationUtilities.markLoadedInDataBucket(relation, model, 'test')
    })

    it('pushes name into DataBucket.metadata."loaded" array', function() {
      const dataset = [
        {
          before: { loaded: [] },
          name: 'a',
          after: { loaded: ['a'] }
        },
        {
          before: { loaded: ['a'] },
          name: 'a',
          after: { loaded: ['a', 'a'] }
        },
        {
          before: { loaded: ['a'] },
          name: 'b',
          after: { loaded: ['a', 'b'] }
        }
      ]

      for (const item of dataset) {
        const model: any = {}
        const relation: any = {
          getDataBucket() {
            return {
              getMetadataOf() {
                return item.before
              }
            }
          }
        }

        RelationUtilities.markLoadedInDataBucket(relation, model, item.name)
        expect(item.before).toEqual(item.after)
      }
    })
  })

  describe('.getAttributeListInDataBucket()', function() {
    it('simply maps the dataBuffer with reader.getAttribute()', function() {
      const dataBuffer = new DataBuffer('id', reader)
      dataBuffer.add({ id: 1, a: 1, b: 2, c: 3 })
      dataBuffer.add({ id: 2, a: 2, b: 4, c: 6 })
      dataBuffer.add({ id: 3, a: 3, b: 6, c: 9 })
      const dataBucket: any = {
        getDataOf() {
          return dataBuffer
        }
      }
      expect(RelationUtilities.getAttributeListInDataBucket(dataBucket, {} as any, 'a')).toEqual([1, 2, 3])
      expect(RelationUtilities.getAttributeListInDataBucket(dataBucket, {} as any, 'b')).toEqual([2, 4, 6])
      expect(RelationUtilities.getAttributeListInDataBucket(dataBucket, {} as any, 'c')).toEqual([3, 6, 9])
    })
  })

  describe('.associateOne()', function() {
    it('calls given setTargetAttributes() then save the model when root model get saved', async function() {
      const rootModel: any = {
        getAttribute() {
          return 'anything'
        },

        once() {}
      }

      const model: any = {
        save() {
          return Promise.resolve(true)
        }
      }

      function setTargetAttributes() {}
      const setTargetAttributesSpy = Sinon.spy(setTargetAttributes)
      const onceSpy = Sinon.spy(rootModel, 'once')
      const saveSpy = Sinon.spy(model, 'save')

      expect(RelationUtilities.associateOne(model, rootModel, 'id', setTargetAttributesSpy)).toBeUndefined()
      expect(setTargetAttributesSpy.calledWith(model)).toBe(true)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(saveSpy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(saveSpy.called).toBe(true)
    })

    it('calls given setTargetAttributes() after root model get saved if the key in rootModel is not found', function() {
      const rootModel: any = {
        getAttribute() {
          return undefined
        },

        once() {}
      }

      const model: any = {
        save() {
          return Promise.resolve(true)
        }
      }

      function setTargetAttributes() {}
      const setTargetAttributesSpy = Sinon.spy(setTargetAttributes)
      const onceSpy = Sinon.spy(rootModel, 'once')
      const saveSpy = Sinon.spy(model, 'save')

      expect(RelationUtilities.associateOne(model, rootModel, 'id', setTargetAttributesSpy)).toBeUndefined()
      expect(setTargetAttributesSpy.called).toBe(false)
      expect(onceSpy.calledWith('saved')).toBe(true)

      expect(saveSpy.called).toBe(false)
      const handler = onceSpy.lastCall.args[1]
      handler()
      expect(saveSpy.called).toBe(true)
      expect(setTargetAttributesSpy.called).toBe(true)
    })
  })
})
