import 'jest'
import * as Sinon from 'sinon'
import { BasicQuery } from '../../../lib/query-builders/shared/BasicQuery'
import { DefaultConvention } from '../../../lib/query-builders/shared/DefaultConvention'
import { QueryCondition } from '../../../lib/query-builders/shared/QueryCondition'

describe('BasicQuery', function() {
  const defaultConvention = new DefaultConvention()

  describe('.select()', function() {
    it('calls flattens all params and append to "fields.select"', function() {
      const query = new BasicQuery(defaultConvention)

      query.select('1')
      expect(query['fields']['select']).toEqual(['1'])

      query.select(['2'], ['3'])
      expect(query['fields']['select']).toEqual(['1', '2', '3'])

      query.select('4')
      expect(query['fields']['select']).toEqual(['1', '2', '3', '4'])

      query.select(['5', '6'], '5', '7', '7')
      expect(query['fields']['select']).toEqual(['1', '2', '3', '4', '5', '6', '7'])
    })
  })

  describe('.orderBy()', function() {
    it('has default direction is ASC', function() {
      const query = new BasicQuery(defaultConvention)
      expect(query.orderBy('a')['ordering']).toEqual({ a: 'asc' })
    })

    it('can set direction to DESC', function() {
      const query = new BasicQuery(defaultConvention)
      expect(query.orderBy('a', 'desc')['ordering']).toEqual({ a: 'desc' })
    })

    it('overrides if fields already exists', function() {
      const query = new BasicQuery(defaultConvention)
      expect(query.orderBy('a', 'asc')['ordering']).toEqual({ a: 'asc' })
      expect(query.orderBy('a', 'desc')['ordering']).toEqual({ a: 'desc' })
      expect(query.orderBy('b')['ordering']).toEqual({ a: 'desc', b: 'asc' })
    })
  })

  describe('.limit()', function() {
    it('has init value is undefined, adds params to "limitNumber"', function() {
      const query = new BasicQuery(defaultConvention)
      expect(query['limitNumber']).toBeUndefined()
      expect(query.limit(10)).toEqual(query)
      expect(query['limitNumber']).toEqual(10)
    })
  })

  describe('.where()', function() {
    it('is chainable, calls QueryCondition.create() with operator "and" and put the result to "conditions"', function() {
      const stub = Sinon.stub(QueryCondition, 'create')
      stub.returns('result')

      const query = new BasicQuery(defaultConvention)
      expect(query.where('a', 'b') === query).toBe(true)

      expect(query['conditions']).toEqual(['result'])
      expect(stub.calledWith(defaultConvention, 'and', 'a', 'b')).toBe(true)
      stub.resetHistory()

      query.where('a', '<>', 'b')
      expect(query['conditions']).toEqual(['result', 'result'])
      expect(stub.calledWith(defaultConvention, 'and', 'a', '<>', 'b')).toBe(true)
      stub.resetHistory()

      const subQuery: any = function() {}
      query.where(subQuery)
      expect(query['conditions']).toEqual(['result', 'result', 'result'])
      expect(stub.calledWith(defaultConvention, 'and', subQuery)).toBe(true)
      stub.resetHistory()

      stub.restore()
    })
  })

  describe('.orWhere()', function() {
    it('is chainable, calls QueryCondition.create() with operator "or" and put the result to "conditions"', function() {
      const stub = Sinon.stub(QueryCondition, 'create')
      stub.returns('result')

      const query = new BasicQuery(defaultConvention)
      expect(query.orWhere('a', 'b') === query).toBe(true)

      expect(query['conditions']).toEqual(['result'])
      expect(stub.calledWith(defaultConvention, 'or', 'a', 'b')).toBe(true)
      stub.resetHistory()

      query.orWhere('a', '<>', 'b')
      expect(query['conditions']).toEqual(['result', 'result'])
      expect(stub.calledWith(defaultConvention, 'or', 'a', '<>', 'b')).toBe(true)
      stub.resetHistory()

      const subQuery: any = function() {}
      query.orWhere(subQuery)
      expect(query['conditions']).toEqual(['result', 'result', 'result'])
      expect(stub.calledWith(defaultConvention, 'or', subQuery)).toBe(true)
      stub.resetHistory()

      stub.restore()
    })
  })
})
