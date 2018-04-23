/// <reference path="interfaces/IModel.d.ts" />
export interface Model<T = any> extends NajsEloquent.Model.IModel<T> {
}
export declare class Model<T = any> {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data?: Object);
    newCollection(dataset: any[]): any;
    newInstance(data?: Object | T): this;
}
