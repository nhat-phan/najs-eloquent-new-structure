/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandle.d.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.d.ts" />
/// <reference path="../definitions/query-grammars/IQuery.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import IQueryBuilderHandle = NajsEloquent.QueryBuilder.IQueryBuilderHandle;
export interface QueryBuilderHandleBase<T extends IModel = IModel> extends IQueryBuilderHandle<T> {
}
export declare abstract class QueryBuilderHandleBase<T extends IModel = IModel> {
    protected model: T;
    protected queryName: string;
    protected logGroup: string;
    protected used: boolean;
    constructor(model: T);
    abstract getBasicQuery(): IBasicQuery;
    abstract getConditionQuery(): IConditionQuery;
    abstract getQueryConvention(): IConvention;
    setQueryName(name: string): void;
    getQueryName(): string;
    getLogGroup(): string;
    setLogGroup(group: string): void;
    markUsed(): void;
    isUsed(): boolean;
}