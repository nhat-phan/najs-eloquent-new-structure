/// <reference path="../definitions/model/IModel.d.ts" />
export interface Model extends NajsEloquent.Model.IModel {
}
export declare class Model {
    constructor(data?: object, isGuarded?: boolean);
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    getDriver(): Najs.Contracts.Eloquent.Driver<any>;
    getModelName(): string;
    query(name?: string): NajsEloquent.QueryBuilder.IQueryBuilder<any, NajsEloquent.QueryBuilder.IQueryBuilderHandler>;
}
