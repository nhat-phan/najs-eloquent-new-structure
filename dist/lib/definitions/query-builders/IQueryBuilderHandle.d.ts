/// <reference path="IExecutor.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../query-grammars/IBasicQuery.d.ts" />
/// <reference path="../query-grammars/IConditionQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    interface IQueryBuilderHandle {
        getModel(): Model.IModel;
        getBasicQuery(): QueryGrammar.IBasicQuery;
        getConditionQuery(): QueryGrammar.IConditionQuery;
        getQueryConvention(): IConvention;
        getQueryExecutor(): IExecutor;
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
        createCollection(result: object[]): CollectJs.Collection<Model.IModel>;
        createInstance(result: object): Model.IModel;
    }
}
