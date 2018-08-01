import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { ExecutorUtils } from '../../../lib/query-builders/shared/ExecutorUtils'

describe('ExecutorUtils', function() {
  describe('addSoftDeleteConditionIfNeeded', function() {
    it('calls .whereNull() with property "deletedAt" from soft delete setting then mark state to added', function() {
      const conditionQuery = {
        whereNull() {}
      }
      const handler = {
        getSoftDeletesSetting() {
          return {
            deletedAt: 'any'
          }
        },
        getConditionQuery() {
          return conditionQuery
        },
        markSoftDeleteState() {},
        shouldAddSoftDeleteCondition() {
          return true
        }
      }

      const markSpy = Sinon.spy(handler, 'markSoftDeleteState')
      const whereNullSpy = Sinon.spy(conditionQuery, 'whereNull')

      ExecutorUtils.addSoftDeleteConditionIfNeeded(handler as any)
      expect(whereNullSpy.calledWith('any')).toBe(true)
      expect(markSpy.calledWith('added')).toBe(true)
    })

    it('does nothing if handler.shouldAddSoftDeleteCondition() returns false', function() {
      const conditionQuery = {
        whereNull() {}
      }
      const handler = {
        getSoftDeletesSetting() {
          return {
            deletedAt: 'any'
          }
        },
        getConditionQuery() {
          return conditionQuery
        },
        markSoftDeleteState() {},
        shouldAddSoftDeleteCondition() {
          return false
        }
      }

      const markSpy = Sinon.spy(handler, 'markSoftDeleteState')
      const whereNullSpy = Sinon.spy(conditionQuery, 'whereNull')

      ExecutorUtils.addSoftDeleteConditionIfNeeded(handler as any)
      expect(whereNullSpy.called).toBe(false)
      expect(markSpy.called).toBe(false)
    })
  })

  describe('.convertConditionsToMongodbQuery()', function() {
    it('makes a MongodbConditionConverter instance with conditions then calls .convert()', function() {
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns({
        convert() {
          return 'data'
        }
      })

      const conditions: any[] = []
      expect(ExecutorUtils.convertConditionsToMongodbQuery(conditions)).toEqual('data')
      expect(makeStub.calledWith('NajsEloquent.QueryBuilder.MongodbConditionConverter')).toBe(true)
    })
  })
})
