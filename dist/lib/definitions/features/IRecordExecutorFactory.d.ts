/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Feature {
    interface IRecordExecutorFactory<T> {
        makeRecordExecutor(model: Model.ModelInternal, record: T): IRecordExecutor<T>;
    }
}
