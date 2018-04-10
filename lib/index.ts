/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/ModelComponent.ts" />
/// <reference path="contracts/ModelProxy.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />
/// <reference path="model/interfaces/IModelFillable.ts" />

import { BuiltinClasses } from './builtin'
import { container as FacadeContainer } from './facades/container'
import { DriverProvider } from './providers/DriverProvider'

export { EloquentDriverProviderFacade, EloquentDriverProvider } from './facades/global/EloquentDriverProviderFacade'

// import { Fillable as FillableClass } from './model/components/Fillable'

// export interface BuiltinClasses {
//   Fillable: typeof FillableClass
// }

// export const Builtin: BuiltinClasses = {
//   Fillable: FillableClass
// }

export const NajsEloquent: BuiltinClasses = {
  FacadeContainer: FacadeContainer,
  Provider: {
    DriverProvider: DriverProvider
  }
}
