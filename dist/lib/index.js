"use strict";
/// <reference path="collect.js/index.d.ts" />
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/Component.ts" />
/// <reference path="contracts/ComponentProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./facades/container");
const DriverProvider_1 = require("./providers/DriverProvider");
const ComponentProvider_1 = require("./providers/ComponentProvider");
var EloquentDriverProviderFacade_1 = require("./facades/global/EloquentDriverProviderFacade");
exports.EloquentDriverProviderFacade = EloquentDriverProviderFacade_1.EloquentDriverProviderFacade;
exports.EloquentDriverProvider = EloquentDriverProviderFacade_1.EloquentDriverProvider;
var EloquentComponentProviderFacade_1 = require("./facades/global/EloquentComponentProviderFacade");
exports.EloquentComponentProviderFacade = EloquentComponentProviderFacade_1.EloquentComponentProviderFacade;
exports.EloquentComponentProvider = EloquentComponentProviderFacade_1.EloquentComponentProvider;
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
        DriverProvider: DriverProvider_1.DriverProvider,
        ComponentProvider: ComponentProvider_1.ComponentProvider
    }
};
