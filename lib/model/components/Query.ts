/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'

const FORWARD_TO_QUERY_BUILDERS = [
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
  'count'
]

export class Query implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Fillable
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['newQuery'] = Query.newQuery
    for (const name of FORWARD_TO_QUERY_BUILDERS) {
      prototype[name] = Query.forwardToQueryBuilder(name)
    }
    prototype['first'] = Query.first
    prototype['find'] = Query.first
    prototype['get'] = Query.get
    prototype['all'] = Query.get
  }

  static newQuery(this: NajsEloquent.Model.IModel<any>): any {
    return this['driver'].newQuery()
  }

  static forwardToQueryBuilder(name: string): any {
    return function(this: NajsEloquent.Model.IModel<any>): any {
      return this['driver'].newQuery()[name](...arguments)
    }
  }

  static async first(this: NajsEloquent.Model.IModel<any>) {
    return this['driver'].newQuery().first()
  }

  static async get(this: NajsEloquent.Model.IModel<any>) {
    return await this['driver'].newQuery().get()
  }
}
