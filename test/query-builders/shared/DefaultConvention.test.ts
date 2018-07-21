import 'jest'
import { DefaultConvention } from '../../../lib/query-builders/shared/DefaultConvention'

describe('DefaultConvention', function() {
  const convention = new DefaultConvention()

  describe('.formatFieldName()', function() {
    it('simply returns name from parameter', function() {
      const dataList = {
        test: 'test',
        id: 'id'
      }

      for (const name in dataList) {
        expect(convention.formatFieldName(name)).toEqual(dataList[name])
      }
    })
  })

  describe('.getNullValueFor()', function() {
    it('simply returns null', function() {
      const dataList = {
        // tslint:disable-next-line
        test: null,
        // tslint:disable-next-line
        id: null
      }

      for (const name in dataList) {
        expect(convention.getNullValueFor(name)).toBeNull()
      }
    })
  })
})
