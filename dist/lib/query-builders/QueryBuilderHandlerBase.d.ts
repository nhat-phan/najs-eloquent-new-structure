/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.d.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.d.ts" />
/// <reference path="../definitions/query-builders/IConvention.d.ts" />
/// <reference path="../definitions/query-builders/IExecutor.d.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandler.d.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.d.ts" />
/// <reference path="../definitions/query-grammars/IQuery.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IExecutor = NajsEloquent.QueryBuilder.IExecutor;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
export declare abstract class QueryBuilderHandlerBase implements IQueryBuilderHandler {
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
    setLogGroup(group: string): void;
    getLogGroup(): string;
    markUsed(): void;
    isUsed(): boolean;
    hasSoftDeletes(): boolean;
    getSoftDeletesSetting(): NajsEloquent.Feature.ISoftDeletesSetting;
    hasTimestamps(): boolean;
    getTimestampsSetting(): NajsEloquent.Feature.ITimestampsSetting;
    markSoftDeleteState(state: 'should-add' | 'should-not-add' | 'added'): void;
    getSoftDeleteState(): string;
    shouldAddSoftDeleteCondition(): boolean;
    createCollection(result: object[]): any;
    createInstance(result: object): any;
}
