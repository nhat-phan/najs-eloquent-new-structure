/// <reference path="../definitions/model/IModel.d.ts" />
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import SubCondition = NajsEloquent.QueryGrammar.SubCondition;
import Range = NajsEloquent.QueryGrammar.Range;
export interface Model extends NajsEloquent.Model.IModel {
}
export declare class Model {
    id?: any;
    constructor(data?: object, isGuarded?: boolean);
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    getDriver(): Najs.Contracts.Eloquent.Driver<any>;
    getModelName(): string;
    newQuery(name?: string): IQueryBuilder<this>;
    /**
     * Start new query of model.
     */
    static newQuery<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>>;
    /**
     * Start new query of model with name.
     */
    static newQuery<T extends typeof Model>(this: T, name: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Set the query with given name
     *
     * @param {string} name
     */
    static queryName<T extends typeof Model>(this: T, name: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Set the query log group name
     *
     * @param {string} group QueryLog group
     */
    static setLogGroup<T extends typeof Model>(this: T, group: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Set the columns or fields to be selected.
     *
     * @param {string|string[]} fields
     */
    static select<T extends typeof Model>(this: T, ...fields: Array<string | string[]>): IQueryBuilder<InstanceType<T>>;
    /**
     * Set the "limit" value of the query.
     * @param {number} records
     */
    static limit<T extends typeof Model>(this: T, record: number): IQueryBuilder<InstanceType<T>>;
    /**
     * Add an "order by" clause to the query.
     *
     * @param {string} field
     */
    static orderBy<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Add an "order by" clause to the query.
     *
     * @param {string} field
     * @param {string} direction
     */
    static orderBy<T extends typeof Model>(this: T, field: string, direction: 'asc' | 'desc'): IQueryBuilder<InstanceType<T>>;
    /**
     * Add an "order by" clause to the query with direction ASC.
     *
     * @param {string} field
     * @param {string} direction
     */
    static orderByAsc<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Add an "order by" clause to the query with direction DESC.
     *
     * @param {string} field
     * @param {string} direction
     */
    static orderByDesc<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Consider all soft-deleted or not-deleted items.
     */
    static withTrashed<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>>;
    /**
     * Consider soft-deleted items only.
     */
    static onlyTrashed<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a basic where clause to the query.
     *
     * @param {Function} conditionBuilder sub-query builder
     */
    static where<T extends typeof Model>(this: T, conditionBuilder: SubCondition): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a basic where clause to the query.
     *
     * @param {string} field
     * @param {mixed} value
     */
    static where<T extends typeof Model>(this: T, field: string, value: any): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a basic where clause to the query.
     *
     * @param {string} field
     * @param {string} operator
     * @param {mixed} value
     */
    static where<T extends typeof Model>(this: T, field: string, operator: Operator, value: any): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where not" clause to the query.
     *
     * @param {string} field
     * @param {mixed} value
     */
    static whereNot<T extends typeof Model>(this: T, field: string, value: any): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where in" clause to the query.
     *
     * @param {string} field
     * @param {any[]} values
     */
    static whereIn<T extends typeof Model>(this: T, field: string, values: Array<any>): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where not in" clause to the query.
     *
     * @param {string} field
     * @param {any[]} values
     */
    static whereNotIn<T extends typeof Model>(this: T, field: string, values: Array<any>): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where null" clause to the query.
     *
     * @param {string} field
     */
    static whereNull<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where null" clause to the query.
     *
     * @param {string} field
     */
    static whereNotNull<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where between" clause to the query.
     *
     * @param {string} field
     */
    static whereBetween<T extends typeof Model>(this: T, field: string, range: Range): IQueryBuilder<InstanceType<T>>;
    /**
     * Add a "where not between" clause to the query.
     *
     * @param {string} field
     */
    static whereNotBetween<T extends typeof Model>(this: T, field: string, range: Range): IQueryBuilder<InstanceType<T>>;
}
