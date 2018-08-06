import { EloquentDriverProvider } from './../facades/global/EloquentDriverProviderFacade'

export function bindDriverIfNeeded(modelName: string, driverName: string, driverClass: any) {
  if (!EloquentDriverProvider.has(driverClass)) {
    EloquentDriverProvider.register(driverClass, driverName)
    EloquentDriverProvider.bind(modelName, driverName)
  }
}
