/// <reference path="IModel.d.ts" />
/// <reference path="IModelQueryAdvanced.d.ts" />
declare namespace NajsEloquent.Model {
    /**
     * Interface contains query functions which attached to the model.
     *
     * This interface based on QueryBuilder, but remove not "start" query functions such as .orWhere() .andWhere()
     */
    interface IModelQuery<T> extends IModelQueryAdvanced<T> {
        /**
         * Create new query builder for model
         */
        newQuery(): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Set the query with given name
         *
         * @param {string} name
         */
        queryName(name: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Set the columns or fields to be selected.
         *
         * @param {string|string[]} fields
         */
        select(...fields: Array<string | string[]>): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Set the "limit" value of the query.
         * @param {number} records
         */
        limit(record: number): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         */
        orderBy(field: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add an "order by" clause to the query.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderBy(field: string, direction: 'asc' | 'desc'): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add an "order by" clause to the query with direction ASC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByAsc(field: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add an "order by" clause to the query with direction DESC.
         *
         * @param {string} field
         * @param {string} direction
         */
        orderByDesc(field: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {Function} conditionBuilder sub-query builder
         */
        where(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        where(field: string, value: any): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a basic where clause to the query.
         *
         * @param {string} field
         * @param {string} operator
         * @param {mixed} value
         */
        where(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where not" clause to the query.
         *
         * @param {string} field
         * @param {mixed} value
         */
        whereNot(field: string, value: any): this;
        /**
         * Add a "where in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereIn(field: string, values: Array<any>): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where not in" clause to the query.
         *
         * @param {string} field
         * @param {any[]} values
         */
        whereNotIn(field: string, values: Array<any>): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNull(field: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where null" clause to the query.
         *
         * @param {string} field
         */
        whereNotNull(field: string): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where between" clause to the query.
         *
         * @param {string} field
         */
        whereBetween(field: string, range: [any, any]): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Add a "where not between" clause to the query.
         *
         * @param {string} field
         */
        whereNotBetween(field: string, range: [any, any]): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Consider all soft-deleted or not-deleted items.
         */
        withTrashed(): IQueryBuilderWrapper<IModel<T> & T>;
        /**
         * Consider soft-deleted items only.
         */
        onlyTrashed(): IQueryBuilderWrapper<IModel<T> & T>;
    }
}
