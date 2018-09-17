"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("../../../lib/drivers/memory/MemoryDataSource");
const NajsBinding = require("najs-binding");
const Sinon = require("sinon");
const constants_1 = require("../../../lib/constants");
const MemoryDataSourceFacade_1 = require("../../../lib/facades/global/MemoryDataSourceFacade");
describe('MemoryDataSource', function () {
    it('calls make() to create new instance of MemoryDataSource as a facade root', function () {
        const makeSpy = Sinon.spy(NajsBinding, 'make');
        MemoryDataSourceFacade_1.MemoryDataSourceFacade.reloadFacadeRoot();
        expect(makeSpy.calledWith(constants_1.NajsEloquent.Driver.Memory.MemoryDataSource)).toBe(true);
        expect(makeSpy.calledOnce).toBe(true);
    });
});
