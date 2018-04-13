import { IFacadeContainer } from 'najs-facade'
import { DriverProvider } from './providers/DriverProvider'
import { ComponentProvider } from './providers/ComponentProvider'

export type BuiltinClasses = {
  FacadeContainer: IFacadeContainer
  Provider: {
    DriverProvider: typeof DriverProvider
    ComponentProvider: typeof ComponentProvider
  }
}
