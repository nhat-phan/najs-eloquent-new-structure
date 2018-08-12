/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Feature {
    interface IRecordExecutor<T> extends IFeature {
        /**
         * Create the given model.
         *
         * @param {Model} model
         */
        create<R = any>(): Promise<R>;
        /**
         * Create the given model.
         *
         * @param {Model} model
         */
        update<R = any>(): Promise<R>;
        /**
         * Delete the given model.
         *
         * @param {Model} model
         */
        delete<R = any>(useSoftDelete: boolean): Promise<R>;
        /**
         * Restore the given model.
         *
         * @param {Model} model
         */
        restore<R = any>(record: T): Promise<R>;
    }
}
