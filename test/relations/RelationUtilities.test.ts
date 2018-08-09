import 'jest'
import { GenericData } from '../../lib/util/GenericData'
import { RelationUtilities } from './../../lib/relations/RelationUtilities'

describe('RelationUtilities', function() {
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
          metadata: {},
          name: 'a',
          result: false
        },
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
              getMetadata() {
                return new GenericData(item.metadata)
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

    it('pushes name into DataBucket.metadata."loaded" array, creates it if needed', function() {
      const dataset = [
        {
          before: {},
          name: 'a',
          after: { loaded: ['a'] }
        },
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
        const data = new GenericData(item.before)
        const relation: any = {
          getDataBucket() {
            return {
              getMetadata() {
                return data
              }
            }
          }
        }

        RelationUtilities.markLoadedInDataBucket(relation, model, item.name)
        expect(data.all()).toEqual(item.after)
      }
    })
  })
})
