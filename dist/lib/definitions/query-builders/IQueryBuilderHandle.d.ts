/// <reference path="IExecutor.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../query-grammars/IBasicQuery.d.ts" />
/// <reference path="../query-grammars/IConditionQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    class IQueryBuilderHandle<T extends Model.IModel = Model.IModel> {
        protected model: T;
        protected queryName: string;
        protected logGroup: string;
        protected used: boolean;
    }
    interface IQueryBuilderHandle<T extends Model.IModel = Model.IModel> {
        getModel(): T;
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
        createCollection(result: object[]): CollectJs.Collection<T>;
        createInstance(result: object): T;
    }
}
