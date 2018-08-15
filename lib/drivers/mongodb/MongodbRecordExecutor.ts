/// <reference path="../../definitions/features/IRecordExecutor.ts" />

import Model = NajsEloquent.Model.IModel
import { Collection } from 'mongodb'
import { Record } from '../Record'
import { MongodbQueryLog } from './MongodbQueryLog'
import * as Moment from 'moment'

export class MongodbRecordExecutor implements NajsEloquent.Feature.IRecordExecutor {
  protected model: NajsEloquent.Model.IModel
  protected record: Record
  protected logger: MongodbQueryLog
  protected collection: Collection

  constructor(model: Model, record: Record, collection: Collection, logger: MongodbQueryLog) {
    this.model = model
    this.record = record
    this.collection = collection
    this.logger = logger
  }

  fillData(isCreate: boolean) {
    const timestampFeature = this.model.getDriver().getTimestampsFeature()
    const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature()

    if (timestampFeature.hasTimestamps(this.model)) {
      const timestampSettings = timestampFeature.getTimestampsSetting(this.model)

      this.record.setAttribute(timestampSettings.updatedAt, Moment().toDate())
      if (isCreate) {
        this.setAttributeIfNeeded(timestampSettings.createdAt, Moment().toDate())
      }
    }

    if (softDeletesFeature.hasSoftDeletes(this.model)) {
      const softDeleteSettings = softDeletesFeature.getSoftDeletesSetting(this.model)

      // tslint:disable-next-line
      this.setAttributeIfNeeded(softDeleteSettings.deletedAt, null)
    }
  }

  setAttributeIfNeeded(attribute: string, value: any) {
    if (typeof this.record.getAttribute(attribute) === 'undefined') {
      this.record.setAttribute(attribute, value)
    }
  }

  async create<R = any>(shouldFillData: boolean = true): Promise<R> {
    if (shouldFillData) {
      this.fillData(true)
    }

    const data = this.record.toObject()
    this.logRaw(data, 'insertOne').action(`${this.model.getModelName()}.create()`)
    return this.collection.insertOne(data).then((response) => {
      return this.logger.end({
        result: response.result,
        insertedId: response.insertedId,
        insertedCount: response.insertedCount
      })
    })
  }

  async update<R = any>(shouldFillData: boolean = true): Promise<R> {
    // if (shouldFillData) {
    //   this.fillData(false)
    // }

    // return new Promise((resolve, reject) => {
    //   this.collection.updateOne(this.record.toObject(), function(error: any, result: any) {
    //     if (error) {
    //       return reject(error)
    //     }
    //     resolve(result)
    //   })
    // }) as any
    return {} as R
  }

  async delete<R = any>(useSoftDelete: boolean): Promise<R> {
    return {} as R
  }

  async restore<R = any>(): Promise<R> {
    return {} as R
  }

  logRaw(data: object, func: string): MongodbQueryLog {
    return this.logger.raw('db.', this.collection.collectionName, `.${func}(`, data, ')')
  }
}
