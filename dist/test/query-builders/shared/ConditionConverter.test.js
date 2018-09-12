"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ConditionQueryHandler_1 = require("../../../lib/query-builders/shared/ConditionQueryHandler");
const BasicQuery_1 = require("../../../lib/query-builders/shared/BasicQuery");
const ConditionConverter_1 = require("../../../lib/query-builders/shared/ConditionConverter");
const QueryBuilder_1 = require("../../../lib/query-builders/QueryBuilder");
const QueryBuilderHandlerBase_1 = require("../../../lib/query-builders/QueryBuilderHandlerBase");
const DefaultConvention_1 = require("../../../lib/query-builders/shared/DefaultConvention");
const factory = {
    make(data) {
        delete data['bool'];
        return data;
    },
    transform(matcher) {
        return matcher;
    }
};
class TestQueryBuilderHandler extends QueryBuilderHandlerBase_1.QueryBuilderHandlerBase {
    constructor(model) {
        super(model, {});
        this.convention = new DefaultConvention_1.DefaultConvention();
        this.basicQuery = new BasicQuery_1.BasicQuery(this.convention);
        this.conditionQuery = new ConditionQueryHandler_1.ConditionQueryHandler(this.basicQuery, this.convention);
    }
    getBasicQuery() {
        return this.basicQuery;
    }
    getConditionQuery() {
        return this.conditionQuery;
    }
    getQueryConvention() {
        return this.convention;
    }
}
function convert_query(cb, simplify) {
    const handler = new TestQueryBuilderHandler({});
    const queryBuilder = new QueryBuilder_1.QueryBuilder(handler);
    cb(queryBuilder);
    const queryConditionData = handler.getBasicQuery().getConditions();
    const converter = new ConditionConverter_1.ConditionConverter(queryConditionData, factory, false);
    return converter.convert();
}
describe('ConditionConverter', function () {
    describe('it works with simplify option = false', function () {
        const dataset = [
            {
                desc: 'it returns empty object if there is no condition',
                query: qb => { },
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
                query: qb => qb
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
                query: qb => qb
                    .where(subQuery => subQuery.where('a', 1).where('b', 2))
                    .orWhere(subQuery => subQuery.where('c', 3).where('d', 4)),
                expected: {
                    $or: [
                        { $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }] },
                        { $and: [{ field: 'c', operator: '=', value: 3 }, { field: 'd', operator: '=', value: 4 }] }
                    ]
                }
            },
            {
                skip: true,
                desc: 'case #6, .where.orWhere.where.orWhere',
                query: qb => qb
                    .where('a', 1)
                    .orWhere('b', 2)
                    .where('c', 3)
                    .orWhere('d', 4),
                // .orWhere(subQuery => subQuery.where('e', 5).where('f', 6)),
                expected: {
                    $or: [
                        { $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }] },
                        { $and: [{ field: 'c', operator: '=', value: 3 }, { field: 'd', operator: '=', value: 4 }] }
                    ]
                }
            }
        ];
        for (const data of dataset) {
            if (data.skip) {
                it.skip(data.desc, function () {
                    expect(convert_query(data.query, false)).toEqual(data.expected);
                });
            }
            else {
                it(data.desc, function () {
                    expect(convert_query(data.query, false)).toEqual(data.expected);
                });
            }
        }
        // a OR b             => a OR b                 => $or: [a,b]
        // a OR b OR c        => a OR b OR c            => $or: [a,b,c]
        // a OR b AND c OR d  => a OR (b AND c) OR d    => $or: [a, { $and: [b,c] }, d ]
        // a AND b OR c       => (a AND b) or c         => $or: [ { $and: [a,b] }, c ]
        // a AND b OR c AND d => (a AND b) or (c AND d) => $or: [ { $and: [a,b] }, { $and: [c,d] } ]
    });
});
