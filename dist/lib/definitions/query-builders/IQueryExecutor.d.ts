/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    interface IQueryExecutor<T extends object = object> {
        /**
         * Set execute mode, can set to "disabled" then nothing will executed in db.
         *
         * @param {string} mode
         */
        setExecuteMode(mode: 'default' | 'disabled'): this;
        /**
         * Determine that should execute a query/command or not.
         */
        shouldExecute(): boolean;
        /**
         * Execute query and return the records as a Collection.
         */
        get(): Promise<T[]>;
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
