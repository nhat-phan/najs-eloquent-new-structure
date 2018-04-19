/// <reference path="../../../../lib/collect.js/index.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    interface IFetchResultQuery<T> {
        /**
         * Execute query and return the records as a Collection.
         */
        get(): Promise<CollectJs.Collection<T>>;
        /**
         * Execute query and returns the first record.
         */
        first(): Promise<T | null>;
        /**
         * Execute query and returns count of records.
         */
        count(): Promise<number>;
        /**
         * Update records which match the query with data.
         *
         * @param {Object} data
         */
        update(data: Object): Promise<any>;
        /**
         * Delete all records which match the query.
         */
        delete(): Promise<any>;
        /**
         * Restore all records which match the query.
         */
        restore(): Promise<any>;
        /**
         * Execute query and returns raw result.
         */
        execute(): Promise<any>;
    }
}
