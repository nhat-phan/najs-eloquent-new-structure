/// <reference path="../query-builders/IQueryBuilder.d.ts" />
/// <reference path="../query-grammars/IBasicConditionQuery.d.ts" />
declare namespace NajsEloquent.Model {
    interface IModelQuery {
        /**
         * Set the query with given name
         *
         * @param {string} name
         */
        queryName(name: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Set the query log group name
         *
         * @param {string} group QueryLog group
         */
        setLogGroup(group: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Set the columns or fields to be selected.
         *
         * @param {string|string[]} fields
         */
        select(...fields: Array<string | string[]>): QueryBuilder.IQueryBuilder<this>;
        /**
         * Set the "limit" value of the query.
         * @param {number} records
         */
        limit(record: number): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         */
        orderBy(field: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderBy(field: string, direction: 'asc' | 'desc'): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add an "order by" clause to the query with direction ASC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByAsc(field: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add an "order by" clause to the query with direction DESC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByDesc(field: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Consider all soft-deleted or not-deleted items.
         */
        withTrashed(): QueryBuilder.IQueryBuilder<this>;
        /**
         * Consider soft-deleted items only.
         */
        onlyTrashed(): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {Function} conditionBuilder sub-query builder
         */
        where(conditionBuilder: QueryGrammar.SubCondition): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        where(field: string, value: any): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {string} operator
         * @param {mixed} value
         */
        where(field: string, operator: Operator, value: any): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where not" clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        whereNot(field: string, value: any): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereIn(field: string, values: Array<any>): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where not in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereNotIn(field: string, values: Array<any>): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNull(field: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNotNull(field: string): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where between" clause to the query.
         *
         * @param {string} field
         */
        whereBetween(field: string, range: QueryGrammar.Range): QueryBuilder.IQueryBuilder<this>;
        /**
         * Add a "where not between" clause to the query.
         *
         * @param {string} field
         */
        whereNotBetween(field: string, range: QueryGrammar.Range): QueryBuilder.IQueryBuilder<this>;
        /**
         * Execute query and returns the first record.
         */
        first(): Promise<this | null>;
        /**
         * Find first record by id
         */
        first(id: any): Promise<this | null>;
        /**
         * Execute query and returns the first record.
         */
        find(): Promise<this | null>;
        /**
         * Find first record by id
         */
        find(id: any): Promise<this | null>;
        /**
         * Execute query and return the records as a Collection.
         */
        get(): Promise<CollectJs.Collection<this>>;
        /**
         * Select some fields and get the result as Collection
         */
        get(...fields: Array<string | string[]>): Promise<CollectJs.Collection<this>>;
        /**
         * Execute query and return the records as a Collection.
         */
        all(): Promise<CollectJs.Collection<this>>;
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
        findById(id: any): Promise<this | null>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        findOrFail(id: any): Promise<this>;
        /**
         * Find first record by id and throws NotFoundException if there is no record
         * @param {string} id
         */
        firstOrFail(id: any): Promise<this>;
    }
}
