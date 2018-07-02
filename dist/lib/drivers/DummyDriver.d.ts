/// <reference path="../definitions/features/IRecordManager.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
import '../features/RecordManager';
import '../features/FillableFeature';
import '../features/SettingFeature';
import { DriverBase } from './DriverBase';
import { Record } from '../features/Record';
export declare class DummyDriver<T extends Record = Record> extends DriverBase<T> {
    protected recordManager: NajsEloquent.Feature.IRecordManager<T>;
    protected fillableFeature: NajsEloquent.Feature.IFillableFeature;
    protected settingFeature: NajsEloquent.Feature.ISettingFeature;
    constructor();
    getClassName(): string;
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
    getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
}
