/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Feature {
  export interface IRecordExecutorFactory<T> {
    makeRecordExecutor(model: Model.ModelInternal, record: T): IRecordExecutor<T>
  }
}
