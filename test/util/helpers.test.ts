import 'jest'
import { Model } from '../../lib'
import { isModel, isCollection } from '../../lib/util/helpers'
import { make_collection } from '../../lib/util/factory'

describe('isModel', function() {
  it('returns true if the given value is Model instance', function() {
    expect(isModel(0)).toBe(false)
    expect(isModel('test')).toBe(false)
    expect(isModel({})).toBe(false)
    expect(isModel(new Date())).toBe(false)
    expect(isModel(make_collection([]))).toBe(false)
    expect(isModel(new Model())).toBe(true)
  })
})

describe('isCollection', function() {
  it('returns true if the given value is Collection instance', function() {
    expect(isCollection(0)).toBe(false)
    expect(isCollection('test')).toBe(false)
    expect(isCollection({})).toBe(false)
    expect(isCollection(new Date())).toBe(false)
    expect(isCollection(new Model())).toBe(false)
    expect(isCollection(make_collection([]))).toBe(true)
  })
})
