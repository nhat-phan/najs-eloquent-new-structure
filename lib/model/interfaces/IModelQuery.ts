/// <reference path="IModel.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.ts" />
/// <reference path="../../collect.js/index.d.ts" />

namespace NajsEloquent.Model {
  export interface IModelQuery<T> {
    /**
     * Create new query builder for model
     */
    newQuery(): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Set the query with given name
     *
     * @param {string} name
     */
    queryName(name: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Set the columns or fields to be selected.
     *
     * @param {string|string[]} fields
     */
    select(...fields: Array<string | string[]>): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Set the "limit" value of the query.
     * @param {number} records
     */
    limit(record: number): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add an "order by" clause to the query.
     *
     * @param {string} field
     */
    orderBy(field: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>
    /**
     * Add an "order by" clause to the query.
     *
     * @param {string} field
     * @param {string} direction
     */
    orderBy(field: string, direction: 'asc' | 'desc'): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add an "order by" clause to the query with direction ASC.
     *
     * @param {string} field
     * @param {string} direction
     */
    orderByAsc(field: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add an "order by" clause to the query with direction DESC.
     *
     * @param {string} field
     * @param {string} direction
     */
    orderByDesc(field: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a basic where clause to the query.
     *
     * @param {Function} conditionBuilder sub-query builder
     */
    where(
      conditionBuilder: NajsEloquent.QueryBuilder.SubCondition
    ): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a basic where clause to the query.
     *
     * @param {string} field
     * @param {mixed} value
     */
    where(field: string, value: any): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a basic where clause to the query.
     *
     * @param {string} field
     * @param {string} operator
     * @param {mixed} value
     */
    where(
      field: string,
      operator: NajsEloquent.QueryBuilder.Operator,
      value: any
    ): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a "where not" clause to the query.
     *
     * @param {string} field
     * @param {mixed} value
     */
    whereNot(field: string, value: any): this

    /**
     * Add a "where in" clause to the query.
     *
     * @param {string} field
     * @param {any[]} values
     */
    whereIn(field: string, values: Array<any>): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a "where not in" clause to the query.
     *
     * @param {string} field
     * @param {any[]} values
     */
    whereNotIn(field: string, values: Array<any>): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a "where null" clause to the query.
     *
     * @param {string} field
     */
    whereNull(field: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a "where null" clause to the query.
     *
     * @param {string} field
     */
    whereNotNull(field: string): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Add a "where between" clause to the query.
     *
     * @param {string} field
     */
    whereBetween(field: string, range: [any, any]): this

    /**
     * Add a "where not between" clause to the query.
     *
     * @param {string} field
     */
    whereNotBetween(field: string, range: [any, any]): this

    /**
     * Consider all soft-deleted or not-deleted items.
     */
    withTrashed(): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Consider soft-deleted items only.
     */
    onlyTrashed(): NajsEloquent.QueryBuilder.IQueryBuilder<IModel<T> & T>

    /**
     * Execute query and returns the first record.
     */
    first(): Promise<(IModel<T> & T) | null>

    /**
     * Execute query and return the records as a Collection.
     */
    get(): Promise<CollectJs.Collection<IModel<T> & T>>

    /**
     * Execute query and returns count of records.
     */
    count(): Promise<number>

    // Helpers & aliases functions -------------------------------------------------------------------------------------
    /**
     * Execute query and returns the first record.
     */
    find(): Promise<IModel<T> & T>

    /**
     * Execute query and return the records as a Collection.
     */
    all(): Promise<CollectJs.Collection<IModel<T> & T>>

    /**
     * Execute query and returns "pluck" result.
     */
    pluck(valueKey: string): Promise<Object>
    /**
     * Execute query and returns "pluck" result.
     */
    pluck(valueKey: string, indexKey: string): Promise<Object>
  }
}
