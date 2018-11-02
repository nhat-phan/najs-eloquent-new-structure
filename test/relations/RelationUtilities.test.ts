import 'jest'
import { Relationship } from './../../lib/relations/Relationship'
import { RelationUtilities } from './../../lib/relations/RelationUtilities'

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
})
