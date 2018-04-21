/// <reference path="../model/interfaces/IModel.ts" />
/// <reference path="interfaces/IQueryBuilderWrapper.ts" />

const FORWARD_FUNCTIONS = [
  'queryName',
  'setLogGroup',
  'getPrimaryKeyName',
  'select',
  'limit',
  'orderBy',
  'orderByAsc',
  'orderByDesc',
  'where',
  'andWhere',
  'orWhere',
  'whereNot',
  'andWhereNot',
  'orWhereNot',
  'whereIn',
  'andWhereIn',
  'orWhereIn',
  'whereNotIn',
  'andWhereNotIn',
  'whereNull',
  'andWhereNull',
  'orWhereNull',
  'whereNotNull',
  'andWhereNotNull',
  'orWhereNotNull',
  'whereBetween',
  'andWhereBetween',
  'orWhereBetween',
  'whereNotBetween',
  'andWhereNotBetween',
  'orWhereNotBetween'
]

export interface QueryBuilderWrapper<T> extends NajsEloquent.Wrapper.IQueryBuilderWrapper<T> {}
export class QueryBuilderWrapper<T> {
  // async get(...fields: Array<string | string[]>): Promise<CollectJs.Collection<NajsEloquent.Model.IModel<T> & T>> {
  //   return <any>{}
  // }
}

for (const name of FORWARD_FUNCTIONS) {
  QueryBuilderWrapper.prototype[name] = function() {
    return this['queryBuilder'][name](...arguments)
  }
}
