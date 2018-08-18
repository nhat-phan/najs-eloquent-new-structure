/// <reference path="../definitions/model/IModel.d.ts" />
export interface Model extends NajsEloquent.Model.IModel {
}
export declare class Model {
    id?: any;
    constructor(data?: object, isGuarded?: boolean);
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    getDriver(): Najs.Contracts.Eloquent.Driver<any>;
    getModelName(): string;
    newQuery(name?: string): NajsEloquent.QueryBuilder.IQueryBuilder<this>;
}
