/// <reference path="interfaces/IModel.d.ts" />
export interface Model<T = any> extends NajsEloquent.Model.IModel<T> {
}
export declare class Model<T = any> {
    private setting;
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data?: Object);
    newCollection(dataset: any[]): any;
    newInstance(data?: Object | T): this;
    private getSetting();
    protected getArrayUniqueSetting(property: string, defaultValue: string[]): string[];
    protected pushToUniqueArraySetting(property: string, args: ArrayLike<any>): this;
}
