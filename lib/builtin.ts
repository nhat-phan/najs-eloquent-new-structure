import { IFacadeContainer } from 'najs-facade'
import { ModelAttribute } from './model/components/ModelAttribute'
import { ModelFillable } from './model/components/ModelFillable'
import { ModelSerialization } from './model/components/ModelSerialization'
import { ModelQuery } from './model/components/ModelQuery'
import { DynamicAttribute } from './model/components/DynamicAttribute'
import { DriverProvider } from './providers/DriverProvider'
import { ComponentProvider } from './providers/ComponentProvider'
import { MongooseProvider } from './providers/MongooseProvider'

export type BuiltinClasses = {
  FacadeContainer: IFacadeContainer
  Model: {
    Component: {
      ModelAttribute: typeof ModelAttribute
      ModelFillable: typeof ModelFillable
      ModelSerialization: typeof ModelSerialization
      ModelQuery: typeof ModelQuery
      DynamicAttribute: typeof DynamicAttribute
    }
  }
  Provider: {
    DriverProvider: typeof DriverProvider
    ComponentProvider: typeof ComponentProvider
    MongooseProvider: typeof MongooseProvider
  }
}
