/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/features/IRecordManager.d.ts" />
import './MongooseDocumentManager';
import { DriverBase } from '../DriverBase';
import { Document } from 'mongoose';
import { MongooseQueryBuilderFactory } from './MongooseQueryBuilderFactory';
export declare class MongooseDriver<T extends Document = Document> extends DriverBase<T> {
    protected documentManager: NajsEloquent.Feature.IRecordManager<T>;
    static Name: string;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    makeQueryBuilderFactory(): MongooseQueryBuilderFactory;
}
