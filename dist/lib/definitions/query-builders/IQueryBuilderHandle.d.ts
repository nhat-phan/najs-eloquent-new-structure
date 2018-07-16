/// <reference path="../model/IModel.d.ts" />
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
        getBasicQuery(): QueryGrammar.IBasicQuery;
        getConditionQuery(): QueryGrammar.IConditionQuery;
        getQueryConvention(): IConvention;
        setQueryName(name: string): void;
        getQueryName(): string;
        getLogGroup(): string;
        setLogGroup(group: string): void;
        markUsed(): void;
        isUsed(): boolean;
    }
}
