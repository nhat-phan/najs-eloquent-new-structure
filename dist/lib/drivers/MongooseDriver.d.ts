/// <reference path="../contracts/Driver.d.ts" />
/// <reference path="../model/interfaces/IModel.d.ts" />
/// <reference path="../model/interfaces/IModelSetting.d.ts" />
import { Document, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
export declare class MongooseDriver<Record extends Object> implements Najs.Contracts.Eloquent.Driver<Record> {
    static className: string;
    protected attributes: Document & Record;
    protected queryLogGroup: string;
    protected modelName: string;
    protected mongooseModel: Model<Document & Record>;
    protected schema: SchemaDefinition;
    protected options: SchemaOptions;
    constructor(model: NajsEloquent.Model.IModel<any> & NajsEloquent.Model.IModelSetting);
    getClassName(): string;
    initialize(model: NajsEloquent.Model.IModel<any>, isGuarded: boolean, data?: any): void;
    protected initializeModelIfNeeded(model: NajsEloquent.Model.IModel<any>): void;
    protected getMongooseSchema(model: NajsEloquent.Model.IModel<any>): Schema;
    protected createAttributesByData(model: NajsEloquent.Model.IModel<any>, isGuarded: boolean, data?: any): void;
    protected getCollectionName(): string;
    getRecord(): Record;
    hasAttribute(name: string): boolean;
    getAttribute<T>(name: string): T;
    setAttribute<T>(name: string, value: T): boolean;
    getPrimaryKeyName(): string;
    toObject(): Object;
    newQuery<T>(): NajsEloquent.Wrapper.IQueryBuilderWrapper<T>;
    delete(softDeletes: boolean): Promise<any>;
    restore(): Promise<any>;
    save(): Promise<any>;
    markModified(name: string): void;
    isNew(): boolean;
    isSoftDeleted(): boolean;
    formatAttributeName(name: string): string;
    getModelComponentName(): string | undefined;
    getModelComponentOrder(components: string[]): string[];
}
