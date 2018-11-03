"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const SerializationPublicApi_1 = require("../../../lib/features/mixin/SerializationPublicApi");
describe('SerializationPublicApi', function () {
    const serializationFeature = {
        getVisible() {
            return 'getVisible-result';
        },
        getHidden() {
            return 'getHidden-result';
        },
        markVisible() {
            return 'markVisible-result';
        },
        markHidden() {
            return 'markHidden-result';
        },
        isVisible() {
            return 'isVisible-result';
        },
        isHidden() {
            return 'isHidden-result';
        },
        attributesToObject() {
            return 'attributesToObject-result';
        },
        relationsToObject() {
            return 'relationsToObject-result';
        },
        toObject() {
            return 'toObject-result';
        },
        toJson() {
            return 'toJson-result';
        }
    };
    const model = {
        driver: {
            getSerializationFeature() {
                return serializationFeature;
            }
        }
    };
    describe('.getVisible()', function () {
        it('calls and returns SerializationFeature.getVisible()', function () {
            const stub = Sinon.stub(serializationFeature, 'getVisible');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.getVisible.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.getHidden()', function () {
        it('calls and returns SerializationFeature.getHidden()', function () {
            const stub = Sinon.stub(serializationFeature, 'getHidden');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.getHidden.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.markVisible()', function () {
        it('is chainable, calls SerializationFeature.markVisible()', function () {
            const stub = Sinon.stub(serializationFeature, 'markVisible');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.markVisible.call(model, 'a', 'b') === model).toBe(true);
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.markHidden()', function () {
        it('is chainable, calls SerializationFeature.markHidden()', function () {
            const stub = Sinon.stub(serializationFeature, 'markHidden');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.markHidden.call(model, 'a', 'b') === model).toBe(true);
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.isVisible()', function () {
        it('calls and returns SerializationFeature.isVisible()', function () {
            const stub = Sinon.stub(serializationFeature, 'isVisible');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.isVisible.call(model, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.isHidden()', function () {
        it('calls and returns SerializationFeature.isHidden()', function () {
            const stub = Sinon.stub(serializationFeature, 'isHidden');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.isHidden.call(model, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.attributesToObject()', function () {
        it('calls and returns SerializationFeature.attributesToObject()', function () {
            const stub = Sinon.stub(serializationFeature, 'attributesToObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.attributesToObject.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.relationsToObject()', function () {
        it('calls and returns SerializationFeature.relationsToObject() with relations=undefined, format=true if there is no params', function () {
            const stub = Sinon.stub(serializationFeature, 'relationsToObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model)).toEqual('anything');
            expect(stub.calledWith(model, undefined, true)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.relationsToObject() with relations=undefined, format=true/false if first param is boolean', function () {
            const stub = Sinon.stub(serializationFeature, 'relationsToObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, true)).toEqual('anything');
            expect(stub.calledWith(model, undefined, true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, false)).toEqual('anything');
            expect(stub.calledWith(model, undefined, false)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.relationsToObject() with relations=[], format=true if first param is string or array', function () {
            const stub = Sinon.stub(serializationFeature, 'relationsToObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, '')).toEqual('anything');
            expect(stub.calledWith(model, [''], true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, [])).toEqual('anything');
            expect(stub.calledWith(model, [], true)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.relationsToObject() with 3rd overridden form', function () {
            const stub = Sinon.stub(serializationFeature, 'relationsToObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, true, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model, ['a', 'b'], true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.relationsToObject.call(model, false, 'x', ['y'], 'z')).toEqual('anything');
            expect(stub.calledWith(model, ['x', 'y', 'z'], false)).toBe(true);
            stub.restore();
        });
    });
    describe('.toObject()', function () {
        it('calls and returns SerializationFeature.toObject() with relations=undefined, format=true if there is no params', function () {
            const stub = Sinon.stub(serializationFeature, 'toObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model)).toEqual('anything');
            expect(stub.calledWith(model, undefined, true)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.toObject() with relations=undefined, format=true/false if first param is boolean', function () {
            const stub = Sinon.stub(serializationFeature, 'toObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, true)).toEqual('anything');
            expect(stub.calledWith(model, undefined, true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, false)).toEqual('anything');
            expect(stub.calledWith(model, undefined, false)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.toObject() with relations=[], format=true if first param is string or array', function () {
            const stub = Sinon.stub(serializationFeature, 'toObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, '')).toEqual('anything');
            expect(stub.calledWith(model, [''], true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, [])).toEqual('anything');
            expect(stub.calledWith(model, [], true)).toBe(true);
            stub.restore();
        });
        it('calls and returns SerializationFeature.toObject() with 3rd overridden form', function () {
            const stub = Sinon.stub(serializationFeature, 'toObject');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, true, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model, ['a', 'b'], true)).toBe(true);
            stub.resetHistory();
            expect(SerializationPublicApi_1.SerializationPublicApi.toObject.call(model, false, 'x', ['y'], 'z')).toEqual('anything');
            expect(stub.calledWith(model, ['x', 'y', 'z'], false)).toBe(true);
            stub.restore();
        });
    });
    describe('.toJson()', function () {
        it('calls and returns SerializationFeature.toJson()', function () {
            const stub = Sinon.stub(serializationFeature, 'toJson');
            stub.returns('anything');
            expect(SerializationPublicApi_1.SerializationPublicApi.toJson.call(model, 1, 2)).toEqual('anything');
            expect(stub.calledWith(model, 1, 2)).toBe(true);
            stub.restore();
        });
    });
});
