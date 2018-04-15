/// <reference path="../../collect.js/index.d.ts" />

namespace NajsEloquent.QueryBuilder {
  export interface IFetchResultQuery<T> {
    /**
     * Execute query and return the records as a Collection.
     */
    get(): Promise<CollectJs.Collection<T>>

    /**
     * Execute query and returns count of records.
     */
    count(): Promise<number>

    /**
     * Execute query and returns the first record.
     */
    first(): Promise<T>

    /**
     * Update records which match the query with data.
     *
     * @param {Object} data
     */
    update(data: Object): Promise<any>

    /**
     * Delete all records which match the query.
     */
    delete(): Promise<any>

    /**
     * Execute query and returns raw result.
     */
    execute(): Promise<any>
  }
}
