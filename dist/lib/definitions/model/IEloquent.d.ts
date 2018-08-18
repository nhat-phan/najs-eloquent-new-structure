/// <reference path="IModel.d.ts" />
/// <reference path="../query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
declare namespace NajsEloquent.Model {
    interface IEloquent<T, QueryBuilder extends QueryBuilder.IQueryBuilder<any, any>> {
        /**
         * Set the query with given name
         *
         * @param {string} name
         */
        queryName(name: string): QueryBuilder;
        /**
         * Set the columns or fields to be selected.
         *
         * @param {string|string[]} fields
         */
        select(...fields: Array<string | string[]>): QueryBuilder;
        /**
         * Set the "limit" value of the query.
         * @param {number} records
         */
        limit(record: number): QueryBuilder;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         */
        orderBy(field: string): QueryBuilder;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderBy(field: string, direction: 'asc' | 'desc'): QueryBuilder;
        /**
         * Add an "order by" clause to the query with direction ASC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByAsc(field: string): QueryBuilder;
        /**
         * Add an "order by" clause to the query with direction DESC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByDesc(field: string): QueryBuilder;
        /**
         * Add a basic where clause to the query.
         *
         * @param {Function} conditionBuilder sub-query builder
         */
        where(conditionBuilder: QueryGrammar.SubCondition): QueryBuilder;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        where(field: string, value: any): QueryBuilder;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {string} operator
         * @param {mixed} value
         */
        where(field: string, operator: QueryGrammar.Operator, value: any): QueryBuilder;
        /**
         * Add a "where not" clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        whereNot(field: string, value: any): QueryBuilder;
        /**
         * Add a "where in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereIn(field: string, values: Array<any>): QueryBuilder;
        /**
         * Add a "where not in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereNotIn(field: string, values: Array<any>): QueryBuilder;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNull(field: string): QueryBuilder;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNotNull(field: string): QueryBuilder;
        /**
         * Add a "where between" clause to the query.
         *
         * @param {string} field
         */
        whereBetween(field: string, range: [any, any]): QueryBuilder;
        /**
         * Add a "where not between" clause to the query.
         *
         * @param {string} field
         */
        whereNotBetween(field: string, range: [any, any]): QueryBuilder;
        /**
         * Consider all soft-deleted or not-deleted items.
         */
        withTrashed(): QueryBuilder;
        /**
         * Consider soft-deleted items only.
         */
        onlyTrashed(): QueryBuilder;
        /**
         * Execute query and returns the first record.
         */
        first(): Promise<(Model.IModel & T) | null>;
        /**
         * Find first record by id
         */
        first(id: any): Promise<(Model.IModel & T) | null>;
        /**
         * Execute query and returns the first record.
         */
        find(): Promise<(Model.IModel & T) | null>;
        /**
         * Find first record by id
         */
        find(id: any): Promise<(Model.IModel & T) | null>;
        /**
         * Execute query and return the records as a Collection.
         */
        get(): Promise<CollectJs.Collection<Model.IModel & T>>;
        /**
         * Select some fields and get the result as Collection
         */
        get(...fields: Array<string | string[]>): Promise<CollectJs.Collection<Model.IModel & T>>;
        /**
         * Execute query and return the records as a Collection.
         */
        all(): Promise<CollectJs.Collection<Model.IModel & T>>;
        /**
         * Execute query and returns count of records.
         */
        count(): Promise<number>;
        /**
         * Execute query and returns "pluck" result.
         */
        pluck(valueKey: string): Promise<object>;
        /**
         * Execute query and returns "pluck" result.
         */
        pluck(valueKey: string, indexKey: string): Promise<object>;
        /**
         * Find first record by id
         * @param {string} id
         */
        findById(id: any): Promise<Model.IModel & T | null>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        findOrFail(id: any): Promise<Model.IModel & T>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        firstOrFail(id: any): Promise<Model.IModel & T>;
    }
}
