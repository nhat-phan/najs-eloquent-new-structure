/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/query-builders/IConvention.d.ts" />
/// <reference path="../definitions/query-builders/IExecutor.d.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandle.d.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.d.ts" />
/// <reference path="../definitions/query-grammars/IQuery.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IExecutor = NajsEloquent.QueryBuilder.IExecutor;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import IQueryBuilderHandle = NajsEloquent.QueryBuilder.IQueryBuilderHandle;
export declare abstract class QueryBuilderHandleBase implements IQueryBuilderHandle {
    protected model: IModel;
    protected queryName: string;
    protected logGroup: string;
    protected used: boolean;
    protected softDeleteState: 'should-add' | 'should-not-add' | 'added';
    constructor(model: IModel);
    abstract getBasicQuery(): IBasicQuery;
    abstract getConditionQuery(): IConditionQuery;
    abstract getQueryConvention(): IConvention;
    abstract getQueryExecutor(): IExecutor;
    getModel(): IModel;
    getPrimaryKeyName(): string;
    setQueryName(name: string): void;
    getQueryName(): string;
    getLogGroup(): string;
    setLogGroup(group: string): void;
    markUsed(): void;
    isUsed(): boolean;
    hasSoftDeletes(): boolean;
    markSoftDeleteState(state: 'should-add' | 'should-not-add' | 'added'): void;
    shouldAddSoftDeleteCondition(): boolean;
    createCollection(result: object[]): any;
    createInstance(result: object): any;
}
