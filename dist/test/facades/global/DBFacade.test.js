"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("../../../lib/drivers/knex/wrappers/KnexWrapper");
// import * as NajsBinding from 'najs-binding'
// import * as Sinon from 'sinon'
// import { NajsEloquent } from '../../../lib/constants'
// import { DBFacade } from '../../../lib/facades/global/DBFacade'
describe('DBFacade', function () {
    it('calls make() to create new instance of KnexWrapper as a facade root', function () {
        // const makeStub = Sinon.stub(NajsBinding, 'make')
        // makeStub.returns({})
        // DBFacade.reloadFacadeRoot()
        // expect(makeStub.calledWith(NajsEloquent.Driver.Knex.KnexWrapper)).toBe(true)
        // expect(makeStub.calledOnce).toBe(true)
    });
});
