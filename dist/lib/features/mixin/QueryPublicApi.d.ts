/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
import Model = NajsEloquent.Model.IModel;
import QueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
export declare const QueryPublicApi: {
    queryName(this: Model, name: string): QueryBuilder<any, any, {}>;
    select(this: Model, ...fields: (string | string[])[]): QueryBuilder<any, any, {}>;
    limit(this: Model, record: number): QueryBuilder<any, any, {}>;
    orderBy(this: Model, field: string, direction?: any): QueryBuilder<any, any, {}>;
    orderByAsc(this: Model, field: string): QueryBuilder<any, any, {}>;
    orderByDesc(this: Model, field: string): QueryBuilder<any, any, {}>;
    where(this: Model, arg1: any, arg2?: any, arg3?: any): QueryBuilder<any, any, {}>;
    whereNot(this: Model, field: string, value: any): QueryBuilder<any, any, {}>;
    whereIn(this: Model, field: string, values: any[]): QueryBuilder<any, any, {}>;
    whereNotIn(this: Model, field: string, values: any[]): QueryBuilder<any, any, {}>;
    whereNull(this: Model, field: string): QueryBuilder<any, any, {}>;
    whereNotNull(this: Model, field: string): QueryBuilder<any, any, {}>;
    whereBetween(this: Model, field: string, range: [any, any]): QueryBuilder<any, any, {}>;
    whereNotBetween(this: Model, field: string, range: [any, any]): QueryBuilder<any, any, {}>;
    withTrashed(this: Model): QueryBuilder<any, any, {}>;
    onlyTrashed(this: Model): QueryBuilder<any, any, {}>;
    first(this: Model, id?: any): Promise<any>;
    find(this: Model, id?: any): Promise<any>;
    get(this: Model): Promise<any>;
    all(this: Model): Promise<any>;
    count(this: Model): Promise<number>;
    pluck(this: Model, valueKey: string, indexKey?: any): Promise<object>;
    findById(this: Model, id: any): Promise<any>;
    findOrFail(this: Model, id: any): Promise<any>;
    firstOrFail(this: Model, id: any): Promise<any>;
};
