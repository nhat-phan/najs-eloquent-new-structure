/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/features/IRecordManager.d.ts" />
import '../RecordManager';
import { DriverBase } from '../DriverBase';
import { Record } from '../Record';
import { MongodbQueryBuilderFactory } from './MongodbQueryBuilderFactory';
export declare class MongodbDriver<T extends Record = Record> extends DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    static Name: string;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    makeQueryBuilderFactory(): MongodbQueryBuilderFactory;
}
