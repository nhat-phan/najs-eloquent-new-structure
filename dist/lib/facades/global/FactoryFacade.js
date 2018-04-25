"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../factory/FactoryManager");
const najs_binding_1 = require("najs-binding");
const najs_facade_1 = require("najs-facade");
const container_1 = require("../container");
const constants_1 = require("../../constants");
const facade = najs_facade_1.Facade.create(container_1.container, 'FactoryManager', function () {
    return najs_binding_1.make(constants_1.NajsEloquent.Factory.FactoryManager);
});
exports.FactoryFacade = facade;
exports.Factory = facade;
// export function factory<T>(className: string | ModelClass<T>, arg1: any, arg2: any): any {
//   let name: string = 'default'
//   if (typeof arg1 === 'string') {
//     name = arg1
//   }
//   let amount: number | undefined = undefined
//   if (typeof arg1 === 'number') {
//     amount = arg1
//   }
//   if (typeof arg2 === 'number') {
//     amount = arg2
//   }
//   return typeof amount === 'undefined' ? Factory.of(className, name) : Factory.of(className, name).times(<number>amount)
// }
