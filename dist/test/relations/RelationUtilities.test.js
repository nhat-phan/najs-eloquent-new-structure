"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const RelationUtilities_1 = require("./../../lib/relations/RelationUtilities");
describe('RelationUtilities', function () {
    describe('.isLoadedInDataBucket()', function () {
        it('does nothing and returns false if there is no dataBucket in relation', function () {
            const model = {};
            const relation = {
                getDataBucket() {
                    return undefined;
                }
            };
            expect(RelationUtilities_1.RelationUtilities.isLoadedInDataBucket(relation, model, 'test')).toBe(false);
        });
        it('returns false if the name is not in array DataBucket.metadata."loaded"', function () {
            const dataset = [
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
            ];
            for (const item of dataset) {
                const model = {};
                const relation = {
                    getDataBucket() {
                        return {
                            getMetadataOf() {
                                return item.metadata;
                            }
                        };
                    }
                };
                expect(RelationUtilities_1.RelationUtilities.isLoadedInDataBucket(relation, model, item.name)).toBe(item.result);
            }
        });
    });
    describe('.markLoadedInDataBucket()', function () {
        it('does nothing if there is no dataBucket in relation', function () {
            const model = {};
            const relation = {
                getDataBucket() {
                    return undefined;
                }
            };
            RelationUtilities_1.RelationUtilities.markLoadedInDataBucket(relation, model, 'test');
        });
        it('pushes name into DataBucket.metadata."loaded" array', function () {
            const dataset = [
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
            ];
            for (const item of dataset) {
                const model = {};
                const relation = {
                    getDataBucket() {
                        return {
                            getMetadataOf() {
                                return item.before;
                            }
                        };
                    }
                };
                RelationUtilities_1.RelationUtilities.markLoadedInDataBucket(relation, model, item.name);
                expect(item.before).toEqual(item.after);
            }
        });
    });
});
