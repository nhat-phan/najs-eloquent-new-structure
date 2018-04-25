/// <reference path="../../lib/collect.js/index.d.ts" />
/// <reference path="contracts/Driver.d.ts" />
/// <reference path="contracts/DriverProvider.d.ts" />
/// <reference path="contracts/Component.d.ts" />
/// <reference path="contracts/ComponentProvider.d.ts" />
/// <reference path="contracts/QueryLog.d.ts" />
/// <reference path="model/interfaces/IModel.d.ts" />
/// <reference path="model/interfaces/IModelQuery.d.ts" />
import { BuiltinClasses } from './builtin';
export { EloquentDriverProviderFacade, EloquentDriverProvider } from './facades/global/EloquentDriverProviderFacade';
export { EloquentComponentProviderFacade, EloquentComponentProvider } from './facades/global/EloquentComponentProviderFacade';
export { FactoryFacade, Factory } from './facades/global/FactoryFacade';
export { Eloquent } from './model/Eloquent';
export declare const NajsEloquent: BuiltinClasses;
