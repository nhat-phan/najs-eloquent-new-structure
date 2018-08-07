import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'

export function bind_driver_if_needed(modelName: string, driverName: string, driverClass: any) {
  if (!EloquentDriverProvider.has(driverClass)) {
    EloquentDriverProvider.register(driverClass, driverName)
    EloquentDriverProvider.bind(modelName, driverName)
  }
}
