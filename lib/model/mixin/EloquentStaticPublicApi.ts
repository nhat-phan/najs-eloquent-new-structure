/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IEloquentStatic.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import { EloquentPublicApi } from './EloquentPublicApi'

export const EloquentStaticPublicApi = Object.assign(
  {},
  {
    newQuery(name?: any): any {
      const modelInstance = Reflect.construct(this as any, []) as Model

      return modelInstance.newQuery(name)
    }
  },
  EloquentPublicApi
) as NajsEloquent.Model.IEloquentStatic<any, any>
