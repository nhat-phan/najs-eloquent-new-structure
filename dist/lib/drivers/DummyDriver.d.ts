/// <reference path="../definitions/features/IRecordManager.d.ts" />
import '../features/RecordManager';
import { DriverBase } from './DriverBase';
import { Record } from '../features/Record';
export declare class DummyDriver<T extends Record = Record> extends DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
}
