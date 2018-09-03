/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/features/IRecordManager.d.ts" />
import '../RecordManager';
import { DriverBase } from '../DriverBase';
import { Record } from '../Record';
import { MongodbQueryBuilder } from './MongodbQueryBuilder';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
export declare class MongodbDriver<T extends Record = Record> extends DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    static Name: string;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    makeQuery<M extends NajsEloquent.Model.IModel>(model: M): MongodbQueryBuilder<M, MongodbQueryBuilderHandler>;
}
