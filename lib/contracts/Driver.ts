/// <reference types="najs-binding" />
/// <reference path="../definitions/features/IFillableFeature.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<T> extends Najs.Contracts.Autoload {
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

    getFillableFeature(): NajsEloquent.Feature.IFillableFeature
  }
}
