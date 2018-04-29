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
import { ChanceFaker } from './factory/FactoryManager'

export type Faker = ChanceFaker
export { EloquentDriverProviderFacade, EloquentDriverProvider } from './facades/global/EloquentDriverProviderFacade'
export {
  EloquentComponentProviderFacade,
  EloquentComponentProvider
} from './facades/global/EloquentComponentProviderFacade'
export { FactoryFacade, Factory, factory } from './facades/global/FactoryFacade'
export { Eloquent, EloquentStaticMongoose } from './model/Eloquent'
export { DummyDriver } from './drivers/DummyDriver'

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
// IModel<T> & T
