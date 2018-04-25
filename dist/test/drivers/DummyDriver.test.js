"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const DummyDriver_1 = require("../../lib/drivers/DummyDriver");
describe('DummyDriver', function () {
    describe('.getClassName()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.getClassName();
        });
    });
    describe('.initialize()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.initialize();
        });
    });
    describe('.getRecord()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.initialize();
        });
    });
    describe('.hasAttribute()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.hasAttribute('a');
        });
    });
    describe('.getAttribute()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.getAttribute('a');
        });
    });
    describe('.setAttribute()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.setAttribute('a', 'test');
        });
    });
    describe('.getPrimaryKeyName()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.getPrimaryKeyName();
        });
    });
    describe('.toObject()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.toObject();
        });
    });
    describe('.newQuery()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.newQuery();
        });
    });
    describe('.delete()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.delete(true);
        });
    });
    describe('.restore()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.restore();
        });
    });
    describe('.save()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.save();
        });
    });
    describe('.isSoftDeleted()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.isSoftDeleted();
        });
    });
    describe('.isNew()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.isNew();
        });
    });
    describe('.markModified()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.markModified('test');
        });
    });
    describe('.getModelComponentName()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.getModelComponentName();
        });
    });
    describe('.getModelComponentOrder()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.getModelComponentOrder([]);
        });
    });
    describe('.formatAttributeName()', function () {
        it('should work', function () {
            const driver = new DummyDriver_1.DummyDriver();
            driver.formatAttributeName('test');
        });
    });
});
