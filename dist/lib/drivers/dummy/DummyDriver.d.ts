/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/features/IRecordManager.d.ts" />
import '../RecordManager';
import { DriverBase } from '../DriverBase';
import { Record } from '../Record';
export declare class DummyDriver<T extends Record = Record> extends DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    makeQuery<M extends NajsEloquent.Model.IModel>(model: M, name?: string): NajsEloquent.QueryBuilder.IQueryBuilder<M>;
}
