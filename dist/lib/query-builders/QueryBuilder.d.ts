/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import { QueryBuilderHandleBase } from './QueryBuilderHandleBase';
export interface QueryBuilder<T extends IModel, Handle extends QueryBuilderHandleBase = QueryBuilderHandleBase> extends IQueryBuilder<T, Handle> {
}
export declare class QueryBuilder<T extends IModel, Handle extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
    protected handler: Handle;
    constructor(handler: Handle);
}
