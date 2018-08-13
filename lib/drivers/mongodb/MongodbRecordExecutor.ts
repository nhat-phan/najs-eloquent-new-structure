/// <reference path="../../definitions/features/IRecordExecutor.ts" />

import Model = NajsEloquent.Model.IModel
import { Collection } from 'mongodb'
import { MongodbQueryLog } from './MongodbQueryLog'

export class MongodbRecordExecutor<T> implements NajsEloquent.Feature.IRecordExecutor<T> {
  protected model: NajsEloquent.Model.IModel
  protected record: object
  protected logger: MongodbQueryLog
  protected collection: Collection

  constructor(model: Model, record: object, collection: Collection, logger: MongodbQueryLog) {
    this.model = model
    this.record = record
    this.collection = collection
    this.logger = logger
  }

  async create<R = any>(): Promise<R> {
    return {} as R
  }

  async update<R = any>(): Promise<R> {
    return {} as R
  }

  async delete<R = any>(useSoftDelete: boolean): Promise<R> {
    return {} as R
  }

  async restore<R = any>(record: T): Promise<R> {
    return {} as R
  }
}
