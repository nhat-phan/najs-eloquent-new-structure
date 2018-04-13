/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/Component.ts" />
/// <reference path="contracts/ComponentProvider.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />
/// <reference path="model/interfaces/IModelFillable.ts" />

import { BuiltinClasses } from './builtin'
import { container as FacadeContainer } from './facades/container'
import { DriverProvider } from './providers/DriverProvider'
import { ComponentProvider } from './providers/ComponentProvider'

export { EloquentDriverProviderFacade, EloquentDriverProvider } from './facades/global/EloquentDriverProviderFacade'
export {
  EloquentComponentProviderFacade,
  EloquentComponentProvider
} from './facades/global/EloquentComponentProviderFacade'

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
    DriverProvider: DriverProvider,
    ComponentProvider: ComponentProvider
  }
}
