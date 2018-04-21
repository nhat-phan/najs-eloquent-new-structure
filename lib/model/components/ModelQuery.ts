/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'

const FORWARD_TO_QUERY_BUILDER_WRAPPER = [
  'queryName',
  'select',
  'limit',
  'orderBy',
  'orderByAsc',
  'orderByDesc',
  'where',
  'whereNot',
  'whereIn',
  'whereNotIn',
  'whereNull',
  'whereNotNull',
  'whereBetween',
  'whereNotBetween',
  'withTrashed',
  'onlyTrashed',
  'first',
  'find',
  'get',
  'count',
  'pluck',
  'findById',
  'findOrFail',
  'firstOrFail'
]

export class ModelQuery implements Najs.Contracts.Eloquent.Component {
  static className = NajsEloquent.Model.Component.ModelQuery
  getClassName(): string {
    return NajsEloquent.Model.Component.ModelQuery
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['newQuery'] = ModelQuery.newQuery
    for (const name of FORWARD_TO_QUERY_BUILDER_WRAPPER) {
      prototype[name] = ModelQuery.forwardToQueryBuilder(name)
    }
  }

  static get FORWARD_TO_QUERY_BUILDER_WRAPPER() {
    return FORWARD_TO_QUERY_BUILDER_WRAPPER
  }

  static newQuery(this: NajsEloquent.Model.IModel<any>): any {
    return this['driver'].newQuery()
  }

  static forwardToQueryBuilder(name: string): any {
    return function(this: NajsEloquent.Model.IModel<any>): any {
      return this['driver'].newQuery()[name](...arguments)
    }
  }
}
register(ModelQuery)
