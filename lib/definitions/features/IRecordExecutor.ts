/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Feature {
  export interface IRecordExecutor {
    /**
     * Execute create for record and model.
     */
    create<R = any>(): Promise<R>

    /**
     * Execute update for record and model.
     */
    update<R = any>(): Promise<R>

    /**
     * Execute hard delete for record and model.
     */
    hardDelete<R = any>(): Promise<R>

    /**
     * Execute soft delete for record and model.
     */
    softDelete<R = any>(): Promise<R>

    /**
     * Execute restore from soft delete for record and model.
     */
    restore<R = any>(): Promise<R>
  }
}
