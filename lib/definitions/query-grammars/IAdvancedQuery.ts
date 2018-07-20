/// <reference path="../collect.js/index.d.ts" />

namespace NajsEloquent.QueryGrammar {
  export interface IAdvancedQuery<Model> {
    /**
     * Execute query and returns the first record.
     */
    first(): Promise<(Model) | null>
    /**
     * Find first record by id
     */
    first(id: any): Promise<(Model) | null>

    /**
     * Execute query and returns the first record.
     */
    find(): Promise<(Model) | null>
    /**
     * Find first record by id
     */
    find(id: any): Promise<(Model) | null>

    /**
     * Execute query and return the records as a Collection.
     */
    get(): Promise<CollectJs.Collection<Model>>
    /**
     * Select some fields and get the result as Collection
     */
    get(...fields: Array<string | string[]>): Promise<CollectJs.Collection<Model>>

    /**
     * Execute query and return the records as a Collection.
     */
    all(): Promise<CollectJs.Collection<Model>>

    /**
     * Execute query and returns count of records.
     */
    count(): Promise<number>

    /**
     * Execute query and returns "pluck" result.
     */
    pluck(valueKey: string): Promise<object>
    /**
     * Execute query and returns "pluck" result.
     */
    pluck(valueKey: string, indexKey: string): Promise<object>

    /**
     * Find first record by id
     * @param {string} id
     */
    findById(id: any): Promise<Model | null>

    /**
     * Find first record by id and throws NotFoundException if there is no record
     * @param {string} id
     */
    findOrFail(id: any): Promise<Model>

    /**
     * Find first record by id and throws NotFoundException if there is no record
     * @param {string} id
     */
    firstOrFail(id: any): Promise<Model>
  }
}
