/// <reference path="interfaces/IModelQuery.d.ts" />
/// <reference path="interfaces/IMongoose.d.ts" />
import { Model } from './Model';
export interface Eloquent<T extends Object = {}> extends NajsEloquent.Model.IModelQuery<T> {
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
    static Mongoose<T>(): NajsEloquent.Model.IMongoose<T>;
    static Class<T>(): NajsEloquent.Model.IMongoose<T>;
}
