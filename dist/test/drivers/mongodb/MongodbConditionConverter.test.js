"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const MongodbConditionConverter_1 = require("../../../lib/drivers/mongodb/MongodbConditionConverter");
describe('MongodbConditionConverter', function () {
    it('implements IAutoload and returns "NajsEloquent.QueryBuilder.MongodbConditionConverter" as className', function () {
        const query = new MongodbConditionConverter_1.MongodbConditionConverter([]);
        expect(query.getClassName()).toEqual('NajsEloquent.QueryBuilder.MongodbConditionConverter');
    });
    describe('protected convertGroupQuery()', function () {
        const dataset = {
            'empty group #and': {
                input: { bool: 'and', queries: [] },
                expected: {}
            },
            'empty group #or': {
                input: { bool: 'and', queries: [] },
                expected: {}
            },
            'single condition case #1': {
                input: {
                    bool: 'and',
                    queries: [{ field: 'a', operator: '=', value: 1 }]
                },
                expected: { a: 1 }
            },
            'single condition case #2': {
                input: {
                    bool: 'or',
                    queries: [{ field: 'a', operator: '<>', value: 1 }]
                },
                expected: { a: { $ne: 1 } }
            },
            'multiple conditions case #1: the result has 2 keys then group by operator': {
                input: {
                    bool: 'and',
                    queries: [
                        { bool: 'and', field: 'a', operator: '=', value: 1 },
                        { bool: 'and', field: 'b', operator: '<>', value: 2 }
                    ]
                },
                expected: { $and: [{ a: 1, b: { $ne: 2 } }] }
            },
            'multiple conditions case #2: the result has 3 keys then group by operator': {
                input: {
                    bool: 'or',
                    queries: [
                        { bool: 'or', field: 'a', operator: '=', value: 1 },
                        { bool: 'or', field: 'b', operator: '<>', value: 2 },
                        { bool: 'or', field: 'c', operator: '<', value: 3 }
                    ]
                },
                expected: { $or: [{ a: 1 }, { b: { $ne: 2 } }, { c: { $lt: 3 } }] }
            },
            'multiple conditions case #3: result same field difference operator, group by operator': {
                input: {
                    bool: 'and',
                    queries: [
                        { bool: 'and', field: 'a', operator: '=', value: 1 },
                        { bool: 'and', field: 'a', operator: '<>', value: 2 }
                    ]
                },
                expected: { $and: [{ a: 1 }, { a: { $ne: 2 } }] }
            },
            'multiple conditions case #4: result has no key return {}': {
                input: {
                    bool: 'and',
                    queries: [
                        { bool: 'and', field: 'a', operator: '=', value: undefined },
                        { bool: 'and', field: 'a', operator: '<>', value: undefined }
                    ]
                },
                expected: {}
            },
            'multiple levels case #1: group an empty group': {
                input: {
                    bool: 'and',
                    queries: [
                        {
                            bool: 'and',
                            queries: []
                        }
                    ]
                },
                expected: {}
            },
            'multiple levels case #2: group 1 key group': {
                input: {
                    bool: 'and',
                    queries: [
                        {
                            bool: 'and',
                            queries: [{ field: 'a', operator: '=', value: 1 }]
                        }
                    ]
                },
                expected: { a: 1 }
            },
            'multiple levels case #3: group 2 keys group': {
                input: {
                    bool: 'and',
                    queries: [
                        {
                            bool: 'and',
                            queries: [
                                { bool: 'and', field: 'a', operator: '=', value: 1 },
                                { bool: 'and', field: 'b', operator: '=', value: 2 }
                            ]
                        }
                    ]
                },
                expected: { $and: [{ a: 1, b: 2 }] }
            },
            'multiple levels case #4: group 2 keys but they are same after converted': {
                input: {
                    bool: 'and',
                    queries: [
                        {
                            bool: 'and',
                            queries: [
                                { bool: 'and', field: 'a', operator: '=', value: 1 },
                                { bool: 'and', field: 'a', operator: '=', value: 2 }
                            ]
                        }
                    ]
                },
                expected: { $and: [{ a: 1 }, { a: 2 }] }
            },
            'multiple levels case #5: group inside group': {
                input: {
                    bool: 'or',
                    queries: [
                        { bool: 'or', field: 'a', operator: '=', value: 1 },
                        { bool: 'or', field: 'b', operator: '=', value: 2 },
                        {
                            bool: 'and',
                            queries: [
                                { bool: 'and', field: 'c', operator: '=', value: 3 },
                                { bool: 'and', field: 'd', operator: '=', value: 4 }
                            ]
                        }
                    ]
                },
                expected: { $or: [{ $or: [{ a: 1 }, { b: 2 }], $and: [{ c: 3, d: 4 }] }] }
            },
            'multiple operators case #1': {
                input: {
                    bool: 'or',
                    queries: [
                        { bool: 'and', field: 'a', operator: '=', value: 1 },
                        { bool: 'and', field: 'b', operator: '=', value: 2 },
                        { bool: 'and', field: 'c', operator: '=', value: 3 },
                        { bool: 'or', field: 'd', operator: '=', value: 4 }
                    ]
                },
                expected: { $or: [{ $and: [{ a: 1, b: 2 }], $or: [{ c: 3 }, { d: 4 }] }] }
            }
        };
        const converter = new MongodbConditionConverter_1.MongodbConditionConverter([]);
        for (const name in dataset) {
            it(name, function () {
                expect(converter['convertGroupQueryData'](dataset[name].input)).toEqual(dataset[name].expected);
            });
        }
    });
    describe('protected convertQueries()', function () {
        const dataset = {
            'case "query.where(a)': {
                input: [{ bool: 'and', field: 'a', operator: '=', value: 1 }],
                expected: {
                    a: 1
                }
            },
            'case "query.where(a).where(a)': {
                input: [
                    { bool: 'and', field: 'a', operator: '>=', value: 1 },
                    { bool: 'and', field: 'a', operator: '<=', value: 10 }
                ],
                expected: {
                    $and: [{ a: { $gte: 1 } }, { a: { $lte: 10 } }]
                }
            },
            'case "query.orWhere(a).where(b)': {
                input: [
                    { bool: 'or', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '=', value: 2 }
                ],
                expected: {
                    a: 1,
                    b: 2
                }
            },
            'case "query.where(a).where(b)': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '=', value: 2 }
                ],
                expected: {
                    a: 1,
                    b: 2
                }
            },
            'case "query.where(a).orWhere(b)': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'or', field: 'b', operator: '=', value: 2 }
                ],
                expected: {
                    $or: [{ a: 1 }, { b: 2 }]
                }
            },
            'case "query.where(a).where(b).where(c)"': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '<', value: 2 },
                    { bool: 'and', field: 'c', operator: '>', value: 3 }
                ],
                expected: {
                    a: 1,
                    b: { $lt: 2 },
                    c: { $gt: 3 }
                }
            },
            'case "query.where(a).orWhere(b).orWhere(c)"': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'or', field: 'b', operator: '<', value: 2 },
                    { bool: 'or', field: 'c', operator: '>', value: 3 }
                ],
                expected: {
                    $or: [{ a: 1 }, { b: { $lt: 2 } }, { c: { $gt: 3 } }]
                }
            },
            'case "query.orWhere(a).where(b).where(c)"': {
                input: [
                    { bool: 'or', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '=', value: 2 },
                    { bool: 'and', field: 'c', operator: '=', value: 3 }
                ],
                expected: {
                    a: 1,
                    b: 2,
                    c: 3
                }
            },
            'case "query.where(a).where(b).orWhere(c)"': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '<', value: 2 },
                    { bool: 'or', field: 'c', operator: '>', value: 3 }
                ],
                expected: {
                    a: 1,
                    $or: [{ b: { $lt: 2 } }, { c: { $gt: 3 } }]
                }
            },
            'case "query.where(a).where(b).orWhere(c).where(d)"': {
                input: [
                    { bool: 'and', field: 'a', operator: '=', value: 1 },
                    { bool: 'and', field: 'b', operator: '=', value: 2 },
                    { bool: 'or', field: 'c', operator: '=', value: 3 },
                    { bool: 'and', field: 'd', operator: '=', value: 4 }
                ],
                expected: {
                    $and: [
                        {
                            a: 1,
                            d: 4
                        }
                    ],
                    $or: [{ b: 2 }, { c: 3 }]
                }
            },
            'case "(query.where(a).where(b)).orWhere(c)"': {
                input: [
                    {
                        bool: 'and',
                        queries: [
                            { bool: 'and', field: 'a', operator: '=', value: 1 },
                            { bool: 'and', field: 'b', operator: '=', value: 2 }
                        ]
                    },
                    { bool: 'or', field: 'c', operator: '=', value: 3 }
                ],
                expected: {
                    $or: [{ a: 1, b: 2 }, { c: 3 }]
                }
            }
        };
        const converter = new MongodbConditionConverter_1.MongodbConditionConverter([]);
        for (const name in dataset) {
            it(name, function () {
                expect(converter['convertQueries'](dataset[name].input)).toEqual(dataset[name].expected);
            });
        }
    });
    describe('.convert()', function () {
        it('converts QueryCondition data structure to mongodb query', function () {
            const converter = new MongodbConditionConverter_1.MongodbConditionConverter([
                { bool: 'and', field: 'a', operator: '=', value: 1 },
                { bool: 'and', field: 'b', operator: '=', value: 2 },
                { bool: 'or', field: 'c', operator: '=', value: 3 },
                { bool: 'and', field: 'd', operator: '=', value: 4 }
            ]);
            expect(converter.convert()).toEqual({
                $and: [
                    {
                        a: 1,
                        d: 4
                    }
                ],
                $or: [{ b: 2 }, { c: 3 }]
            });
        });
    });
});
