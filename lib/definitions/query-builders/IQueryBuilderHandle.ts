/// <reference path="../model/IModel.ts" />
/// <reference path="../query-grammars/IBasicQuery.ts" />
/// <reference path="../query-grammars/IConditionQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export declare class IQueryBuilderHandle<T extends Model.IModel = Model.IModel> {
    protected model: T
    protected queryName: string
    protected logGroup: string
    protected used: boolean
  }

  export interface IQueryBuilderHandle<T extends Model.IModel = Model.IModel> {
    getModel(): T
    getBasicQuery(): QueryGrammar.IBasicQuery
    getConditionQuery(): QueryGrammar.IConditionQuery
    getQueryConvention(): IConvention

    setQueryName(name: string): void

    getQueryName(): string

    getLogGroup(): string

    setLogGroup(group: string): void

    markUsed(): void

    isUsed(): boolean

    hasSoftDeletes(): boolean

    markSoftDeleteState(state: 'should-add' | 'should-not-add' | 'added'): void

    shouldAddSoftDeleteCondition(): boolean
  }
}
