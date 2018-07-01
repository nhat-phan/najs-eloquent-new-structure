/// <reference path="../definitions/model/IModel.d.ts" />
export interface Model<T> extends NajsEloquent.Model.IModel<T> {
}
export declare class Model<T> {
    constructor(data?: T | object, isGuarded?: boolean);
    getDriver(): Najs.Contracts.Eloquent.Driver<T>;
    getModelName(): string;
}
