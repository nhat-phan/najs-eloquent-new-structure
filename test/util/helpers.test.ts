import 'jest'
import { register } from 'najs-binding'
import { Model } from '../../lib'
import { isModel, isCollection, distinctModelByClassInCollection } from '../../lib/util/helpers'
import { make_collection } from '../../lib/util/factory'

class TestModel extends Model {
  getClassName() {
    return 'TestModel'
  }
}
register(TestModel)

describe('isModel', function() {
  it('returns true if the given value is Model instance', function() {
    expect(isModel(0)).toBe(false)
    expect(isModel('test')).toBe(false)
    expect(isModel({})).toBe(false)
    expect(isModel(new Date())).toBe(false)
    expect(isModel(make_collection([]))).toBe(false)
    expect(isModel(new TestModel())).toBe(true)
  })
})

describe('isCollection', function() {
  it('returns true if the given value is Collection instance', function() {
    expect(isCollection(0)).toBe(false)
    expect(isCollection('test')).toBe(false)
    expect(isCollection({})).toBe(false)
    expect(isCollection(new Date())).toBe(false)
    expect(isCollection(new TestModel())).toBe(false)
    expect(isCollection(make_collection([]))).toBe(true)
  })
})

describe('.distinctModelByClassInCollection()', function() {
  it('returns an empty array if param is not collection', function() {
    expect(distinctModelByClassInCollection({} as any)).toEqual([])
  })

  it('returns an empty array if collection is empty', function() {
    expect(distinctModelByClassInCollection(make_collection([]) as any)).toEqual([])
  })

  it('groups returns an array by .getModelName()', function() {
    const modelA1 = {
      getModelName() {
        return 'A'
      }
    }
    const modelA2 = {
      getModelName() {
        return 'A'
      }
    }
    const modelB1 = {
      getModelName() {
        return 'B'
      }
    }
    const modelB2 = {
      getModelName() {
        return 'B'
      }
    }

    const result = distinctModelByClassInCollection(make_collection([modelA1, modelA2, modelB1, modelB2]) as any)
    expect(result).toHaveLength(2)
    expect(result[0] === modelA1).toBe(true)
    expect(result[1] === modelB1).toBe(true)
  })
})
