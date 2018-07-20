"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const FillablePublicApi_1 = require("../../../lib/features/mixin/FillablePublicApi");
describe('FillablePublicApi', function () {
    const fillableFeature = {
        getFillable() {
            return 'getFillable-result';
        },
        getGuarded() {
            return 'getGuarded-result';
        },
        markFillable() {
            return 'markFillable-result';
        },
        markGuarded() {
            return 'markGuarded-result';
        },
        isFillable() {
            return 'isFillable-result';
        },
        isGuarded() {
            return 'isGuarded-result';
        },
        fill() {
            return 'fill-result';
        },
        forceFill() {
            return 'forceFill-result';
        }
    };
    const model = {
        driver: {
            getFillableFeature() {
                return fillableFeature;
            }
        }
    };
    describe('.getFillable()', function () {
        it('calls and returns FillableFeature.getFillable()', function () {
            const stub = Sinon.stub(fillableFeature, 'getFillable');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.getFillable.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.getGuarded()', function () {
        it('calls and returns FillableFeature.getGuarded()', function () {
            const stub = Sinon.stub(fillableFeature, 'getGuarded');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.getGuarded.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.markFillable()', function () {
        it('is chainable, calls FillableFeature.markFillable()', function () {
            const stub = Sinon.stub(fillableFeature, 'markFillable');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.markFillable.call(model, 'a', 'b') === model).toBe(true);
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.markGuarded()', function () {
        it('is chainable, calls FillableFeature.markGuarded()', function () {
            const stub = Sinon.stub(fillableFeature, 'markGuarded');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.markGuarded.call(model, 'a', 'b') === model).toBe(true);
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.isFillable()', function () {
        it('calls and returns FillableFeature.isFillable()', function () {
            const stub = Sinon.stub(fillableFeature, 'isFillable');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.isFillable.call(model, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.isGuarded()', function () {
        it('calls and returns FillableFeature.isGuarded()', function () {
            const stub = Sinon.stub(fillableFeature, 'isGuarded');
            stub.returns('anything');
            expect(FillablePublicApi_1.FillablePublicApi.isGuarded.call(model, 'a', 'b')).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            expect(stub.lastCall.args[1][0]).toEqual('a');
            expect(stub.lastCall.args[1][1]).toEqual('b');
            stub.restore();
        });
    });
    describe('.fill()', function () {
        it('is chainable, calls FillableFeature.fill()', function () {
            const stub = Sinon.stub(fillableFeature, 'fill');
            stub.returns('anything');
            const data = { a: 1, b: 2 };
            expect(FillablePublicApi_1.FillablePublicApi.fill.call(model, data) === model).toBe(true);
            expect(stub.calledWith(model, data)).toBe(true);
            stub.restore();
        });
    });
    describe('.forceFill()', function () {
        it('is chainable, calls FillableFeature.forceFill()', function () {
            const stub = Sinon.stub(fillableFeature, 'forceFill');
            stub.returns('anything');
            const data = { a: 1, b: 2 };
            expect(FillablePublicApi_1.FillablePublicApi.forceFill.call(model, data) === model).toBe(true);
            expect(stub.calledWith(model, data)).toBe(true);
            stub.restore();
        });
    });
});
