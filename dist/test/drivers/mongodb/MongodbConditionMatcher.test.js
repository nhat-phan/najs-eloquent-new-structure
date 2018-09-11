"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const MongodbConditionMatcher_1 = require("../../../lib/drivers/mongodb/MongodbConditionMatcher");
describe('MongodbConditionMatcher', function () {
    describe('.isMatch()', function () {
        it('always throws an exception', function () {
            const matcher = new MongodbConditionMatcher_1.MongodbConditionMatcher('test', '=', 'value');
            try {
                matcher.isMatch({});
            }
            catch (error) {
                expect(error.message).toEqual('This class builds a condition for native matcher, please do not use isMatch() function.');
                return;
            }
            expect('should not reach this line').toEqual('hm');
        });
    });
    describe('.buildNativeCondition()', function () {
        const equalsOperatorDataset = {
            'equals case #1': {
                input: { field: 'a', operator: '=', value: 1 },
                expected: { a: 1 }
            },
            'equals case #2': {
                input: { field: 'a', operator: '==', value: true },
                expected: { a: true }
            },
            'equals case #3': {
                input: { field: 'a', operator: '=', value: undefined },
                expected: {}
            },
            'equals case #4': {
                input: { field: 'something.field', operator: '==', value: 'value' },
                expected: { something: { field: 'value' } }
            }
        };
        for (const name in equalsOperatorDataset) {
            it(name, function () {
                const input = equalsOperatorDataset[name].input;
                const matcher = new MongodbConditionMatcher_1.MongodbConditionMatcher(input.field, input.operator, input.value);
                expect(matcher.getCondition()).toEqual(equalsOperatorDataset[name].expected);
            });
        }
        function extend_dataset(name, operator, alternate, mgOpt) {
            return {
                [name + ' case #1']: {
                    input: { field: 'a', operator: operator, value: 1 },
                    expected: { a: { [mgOpt]: 1 } }
                },
                [name + ' case #2']: {
                    input: { field: 'a', operator: alternate, value: true },
                    expected: { a: { [mgOpt]: true } }
                },
                [name + ' case #3']: {
                    input: { field: 'a', operator: operator, value: undefined },
                    expected: {}
                },
                [name + ' case #4']: {
                    input: { field: 'something.field', operator: alternate, value: 'value' },
                    expected: { something: { field: { [mgOpt]: 'value' } } }
                }
            };
        }
        function test_for_operator(operatorName, operator, alternate, mgOpt) {
            const dataset = extend_dataset(operatorName, operator, alternate, mgOpt);
            for (const name in dataset) {
                it(name, function () {
                    const input = dataset[name].input;
                    const matcher = new MongodbConditionMatcher_1.MongodbConditionMatcher(input.field, input.operator, input.value);
                    expect(matcher.getCondition()).toEqual(dataset[name].expected);
                });
            }
        }
        test_for_operator('not-equals', '!=', '<>', '$ne');
        test_for_operator('less than', '<', '<', '$lt');
        test_for_operator('less than or equal', '<=', '=<', '$lte');
        test_for_operator('great than', '>', '>', '$gt');
        test_for_operator('great than or equal', '>=', '=>', '$gte');
        test_for_operator('in', 'in', 'in', '$in');
        test_for_operator('not in', 'not-in', 'not-in', '$nin');
    });
});
