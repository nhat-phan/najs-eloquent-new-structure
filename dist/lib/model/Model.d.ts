/// <reference path="interfaces/IModel.d.ts" />
export interface Model<T = any> extends NajsEloquent.Model.IModel<T> {
}
export declare class Model<T = any> {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     * @param {boolean|undefined} isGuarded
     */
    constructor(data?: Object, isGuarded?: boolean);
    newCollection(dataset: any[]): any;
    newInstance(data?: Object | T): this;
}
