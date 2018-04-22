/// <reference path="interfaces/IModelQuery.d.ts" />
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
    static register(model: {
        new (): Eloquent;
    }): void;
}
