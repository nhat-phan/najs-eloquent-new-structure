/// <reference path="collect.js/index.d.ts" />
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/Component.ts" />
/// <reference path="contracts/ComponentProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />

import { BuiltinClasses } from './builtin'
import { container as FacadeContainer } from './facades/container'
import { ModelAttribute } from './model/components/ModelAttribute'
import { ModelFillable } from './model/components/ModelFillable'
import { ModelSerialization } from './model/components/ModelSerialization'
import { ModelQuery } from './model/components/ModelQuery'
import { DynamicAttribute } from './model/components/DynamicAttribute'
import { DriverProvider } from './providers/DriverProvider'
import { ComponentProvider } from './providers/ComponentProvider'
import { MongooseProvider } from './providers/MongooseProvider'

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
  Model: {
    Component: {
      ModelAttribute: ModelAttribute,
      ModelFillable: ModelFillable,
      ModelSerialization: ModelSerialization,
      ModelQuery: ModelQuery,
      DynamicAttribute: DynamicAttribute
    }
  },
  Provider: {
    DriverProvider: DriverProvider,
    ComponentProvider: ComponentProvider,
    MongooseProvider: MongooseProvider
  }
}
