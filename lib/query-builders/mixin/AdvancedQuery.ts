/// <reference path="../QueryBuilder.ts" />
/// <reference path="../../definitions/query-grammars/IAdvancedQuery.ts" />
import QueryBuilder = NajsEloquent.QueryBuilder.QueryBuilderInternal

import { NotFoundError } from '../../errors/NotFoundError'

export const AdvancedQuery: NajsEloquent.QueryGrammar.IAdvancedQuery<any> = {
  async first(this: QueryBuilder, id?: any) {
    if (typeof id !== 'undefined') {
      this.where(this.handler.getPrimaryKeyName(), id)
    }
    const result = await this.handler.getQueryExecutor().first()
    return result ? this.handler.createInstance(result) : result
  },

  async find(this: QueryBuilder, id?: any) {
    return this.first(id)
  },

  async get(this: QueryBuilder, ...fields: Array<string | string[]>): Promise<CollectJs.Collection<any>> {
    if (arguments.length !== 0) {
      this.select(...fields)
    }
    return this.handler.createCollection(await this.handler.getQueryExecutor().get())
  },

  async all(this: QueryBuilder): Promise<CollectJs.Collection<any>> {
    return this.get()
  },

  async pluck(this: QueryBuilder, valueKey: string, indexKey?: string): Promise<object> {
    const indexKeyName = typeof indexKey === 'undefined' ? this.handler.getPrimaryKeyName() : indexKey
    this.select(valueKey, indexKeyName)
    const result = await this.handler.getQueryExecutor().get()

    return result.reduce(function(memo: Object, item: Object) {
      memo[item[indexKeyName]] = item[valueKey]
      return memo
    }, {})
  },

  async findById(this: QueryBuilder, id: any) {
    return this.first(id)
  },

  async findOrFail(this: QueryBuilder, id: any) {
    return this.firstOrFail(id)
  },

  async firstOrFail(this: QueryBuilder, id: any) {
    const result = await this.first(id)
    if (!result) {
      throw new NotFoundError(this.handler.getModel().getModelName())
    }
    return result
  }
}
