"use strict";
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/Component.ts" />
/// <reference path="contracts/ComponentProvider.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />
/// <reference path="model/interfaces/IModelFillable.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./facades/container");
const DriverProvider_1 = require("./providers/DriverProvider");
var EloquentDriverProviderFacade_1 = require("./facades/global/EloquentDriverProviderFacade");
exports.EloquentDriverProviderFacade = EloquentDriverProviderFacade_1.EloquentDriverProviderFacade;
exports.EloquentDriverProvider = EloquentDriverProviderFacade_1.EloquentDriverProvider;
// import { Fillable as FillableClass } from './model/components/Fillable'
// export interface BuiltinClasses {
//   Fillable: typeof FillableClass
// }
// export const Builtin: BuiltinClasses = {
//   Fillable: FillableClass
// }
exports.NajsEloquent = {
    FacadeContainer: container_1.container,
    Provider: {
        DriverProvider: DriverProvider_1.DriverProvider
    }
};
