/// <reference path="interfaces/IModelQuery.d.ts" />
/// <reference path="interfaces/static/IMongooseStatic.d.ts" />
import { Model } from './Model';
import { MongooseQueryBuilderWrapper } from '../wrappers/MongooseQueryBuilderWrapper';
export interface Eloquent<T extends Object = {}> extends NajsEloquent.Model.IModelQuery<T, NajsEloquent.Wrapper.IQueryBuilderWrapper<Model<T> & T>> {
}
export declare class Eloquent<T extends Object = {}> extends Model<T> {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data?: Object);
    /**
     * Register given model.
     *
     * @param {Eloquent} model
     */
    static register(model: {
        new (): Eloquent;
    }): void;
    static Mongoose<T>(): NajsEloquent.Model.Static.IMongooseStatic<T, MongooseQueryBuilderWrapper<Model<T> & T>>;
    static Class<T>(): NajsEloquent.Model.Static.IMongooseStatic<T, MongooseQueryBuilderWrapper<Model<T> & T>>;
}
