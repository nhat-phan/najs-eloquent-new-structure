/// <reference path="../definitions/model/IEloquent.d.ts" />
import IEloquent = NajsEloquent.Model.IEloquent;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import { Model } from './Model';
export interface EloquentStatic<T> extends NajsEloquent.Model.IEloquentStatic<T, IQueryBuilder<Model & T>> {
}
export interface Eloquent<T> extends IEloquent<T, IQueryBuilder<Model & T>> {
}
export declare class Eloquent<T> extends Model {
    static Class<T>(): EloquentStatic<T>;
}
