/// <reference path="../definitions/query-builders/IQueryBuilder.d.ts" />
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import { QueryBuilderHandleBase } from './QueryBuilderHandleBase';
export interface QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> extends IQueryBuilder<T> {
}
export declare class QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
    protected handler: T;
    constructor(handler: T);
}
