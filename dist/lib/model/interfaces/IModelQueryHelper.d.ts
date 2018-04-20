/// <reference path="IModel.d.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.d.ts" />
declare namespace NajsEloquent.Model {
    interface IModelQueryHelper<T> {
        /**
         * Find first record by id
         */
        first(id: any): Promise<(IModel<T> & T) | null>;
        /**
         * Find first record by id
         */
        find(id: any): Promise<(IModel<T> & T) | null>;
        /**
         * Select some fields and get the result as Collection
         */
        get(...fields: Array<string | string[]>): Promise<(IModel<T> & T) | null>;
        /**
         * Execute query and returns "pluck" result.
         */
        pluck(valueKey: string): Promise<Object>;
        /**
         * Execute query and returns "pluck" result.
         */
        pluck(valueKey: string, indexKey: string): Promise<Object>;
        /**
         * Find first record by id
         * @param {string} id
         */
        findById(id: any): Promise<IModel<T> & T | null>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        findOrFail(id: any): Promise<IModel<T> & T | null>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        firstOrFail(id: any): Promise<IModel<T> & T | null>;
    }
}
