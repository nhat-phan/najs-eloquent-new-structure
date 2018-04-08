/// <reference path="interfaces/IModel.d.ts" />
/// <reference path="interfaces/IEloquent.d.ts" />
export declare class ModelMetadata {
    protected model: NajsEloquent.Model.IModel<any>;
    protected definition: NajsEloquent.Model.IEloquent<any>;
    private constructor();
    getSetting<T>(property: string, merger: (staticVersion?: T, memberVersion?: T) => T): T;
    static arrayUnique<T>(staticVersion?: T[], memberVersion?: T[]): T[];
    /**
     * store ModelMetadata instance with "sample" model
     */
    protected static cached: Object;
    /**
     * get metadata of Model class
     */
    static get(model: NajsEloquent.Model.IModel<any>): ModelMetadata;
    static get(model: NajsEloquent.Model.IModel<any>, cache: boolean): ModelMetadata;
}
