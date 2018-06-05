/// <reference path="../definitions/features/IFillableFeature.d.ts" />
declare namespace Najs.Contracts.Eloquent {
    interface Driver<T> extends Najs.Contracts.Autoload {
        getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
        getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
    }
}
