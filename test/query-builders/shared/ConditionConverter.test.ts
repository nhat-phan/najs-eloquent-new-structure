import { ConditionQueryHandler } from '../../../lib/query-builders/shared/ConditionQueryHandler'
import { BasicQuery } from '../../../lib/query-builders/shared/BasicQuery'
import 'jest'
import { ConditionConverter } from '../../../lib/query-builders/shared/ConditionConverter'
import { QueryBuilder } from '../../../lib/query-builders/QueryBuilder'
import { QueryBuilderHandlerBase } from '../../../lib/query-builders/QueryBuilderHandlerBase'
import { DefaultConvention } from '../../../lib/query-builders/shared/DefaultConvention'

const factory = {
  make(data: any) {
    delete data['bool']

    return data
  },

  transform(matcher: any) {
    return matcher
  }
}

type TestData = {
  skip?: boolean
  desc: string
  query: (qb: QueryBuilder<any>) => void
  expected: object
}

class TestQueryBuilderHandler extends QueryBuilderHandlerBase {
  protected basicQuery: BasicQuery
  protected conditionQuery: ConditionQueryHandler
  protected convention: DefaultConvention

  constructor(model: any) {
    super(model, {} as any)
    this.convention = new DefaultConvention()
    this.basicQuery = new BasicQuery(this.convention)
    this.conditionQuery = new ConditionQueryHandler(this.basicQuery, this.convention)
  }

  getBasicQuery() {
    return this.basicQuery
  }

  getConditionQuery() {
    return this.conditionQuery
  }

  getQueryConvention() {
    return this.convention
  }
}

function convert_query(cb: ((qb: QueryBuilder<any>) => void), simplify: boolean) {
  const handler = new TestQueryBuilderHandler({})
  const queryBuilder = new QueryBuilder(handler)
  cb(queryBuilder)

  const queryConditionData = handler.getBasicQuery().getConditions()
  const converter = new ConditionConverter(queryConditionData as any, factory, false)
  return converter.convert()
}

describe('ConditionConverter', function() {
  describe('it works with simplify option = false', function() {
    const dataset: TestData[] = [
      {
        skip: false,
        desc: 'it returns empty object if there is no condition',
        query: qb => {},
        expected: {}
      },
      {
        desc: 'case #1, add condition under $and array',
        query: qb => qb.where('a', 1),
        expected: {
          $and: [{ field: 'a', operator: '=', value: 1 }]
        }
      },
      {
        desc: 'case #2, add conditions under $and array',
        query: qb => qb.where('a', 1).where('b', 2),
        expected: {
          $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
        }
      },
      {
        desc: 'case #3, .where().where().orWhere()',
        query: qb =>
          qb
            .where('a', 1)
            .where('b', 2)
            .orWhere('c', 3),
        expected: {
          $and: [{ field: 'a', operator: '=', value: 1 }],
          $or: [{ field: 'b', operator: '=', value: 2 }, { field: 'c', operator: '=', value: 3 }]
        }
      },
      {
        desc: 'case #4, (.where().where()).orWhere()',
        query: qb => qb.where(subQuery => subQuery.where('a', 1).where('b', 2)).orWhere('c', 3),
        expected: {
          $or: [
            {
              $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
            },
            { field: 'c', operator: '=', value: 3 }
          ]
        }
      },
      {
        desc: 'case #5, .where(.where().where()).orWhere(.where().where())',
        query: qb =>
          qb
            .where(subQuery => subQuery.where('a', 1).where('b', 2))
            .orWhere(subQuery => subQuery.where('c', 3).where('d', 4)),
        expected: {
          $or: [
            { $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }] },
            { $and: [{ field: 'c', operator: '=', value: 3 }, { field: 'd', operator: '=', value: 4 }] }
          ]
        }
      }
    ]

    for (const data of dataset) {
      if (data.skip) {
        it.skip(data.desc, function() {
          expect(convert_query(data.query, false)).toEqual(data.expected)
        })
      } else {
        it(data.desc, function() {
          expect(convert_query(data.query, false)).toEqual(data.expected)
        })
      }
    }
  })
})
