/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />

import IConvention = NajsEloquent.QueryBuilder.IConvention
import Model = NajsEloquent.Model.IModel
import { Collection } from 'mongodb'
import { Record } from '../Record'
import { MongodbQueryLog } from './MongodbQueryLog'
import { MongodbConvention } from '../../query-builders/shared/MongodbConvention'
import { isEmpty } from 'lodash'
import * as Moment from 'moment'

export class MongodbRecordExecutor implements NajsEloquent.Feature.IRecordExecutor {
  protected model: NajsEloquent.Model.IModel
  protected record: Record
  protected logger: MongodbQueryLog
  protected convention: IConvention
  protected collection: Collection

  constructor(model: Model, record: Record, collection: Collection, logger: MongodbQueryLog) {
    this.model = model
    this.record = record
    this.collection = collection
    this.logger = logger
    this.convention = new MongodbConvention()
  }

  fillData(isCreate: boolean) {
    this.fillTimestampsData(isCreate)
    this.fillSoftDeletesData()
  }

  fillSoftDeletesData() {
    const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature()

    if (softDeletesFeature.hasSoftDeletes(this.model)) {
      const softDeleteSettings = softDeletesFeature.getSoftDeletesSetting(this.model)
      this.setAttributeIfNeeded(
        this.convention.formatFieldName(softDeleteSettings.deletedAt),
        this.convention.getNullValueFor(softDeleteSettings.deletedAt)
      )
    }
  }

  fillTimestampsData(isCreate: boolean) {
    const timestampFeature = this.model.getDriver().getTimestampsFeature()

    if (timestampFeature.hasTimestamps(this.model)) {
      const timestampSettings = timestampFeature.getTimestampsSetting(this.model)

      this.record.setAttribute(this.convention.formatFieldName(timestampSettings.updatedAt), Moment().toDate())
      if (isCreate) {
        this.setAttributeIfNeeded(this.convention.formatFieldName(timestampSettings.createdAt), Moment().toDate())
      }
    }
  }

  setAttributeIfNeeded(attribute: string, value: any) {
    if (typeof this.record.getAttribute(attribute) === 'undefined') {
      this.record.setAttribute(attribute, value)
    }
  }

  async create<R = any>(shouldFillData: boolean = true, action: string = 'create'): Promise<R> {
    if (shouldFillData) {
      this.fillData(true)
    }

    const data = this.record.toObject()
    this.logRaw('insertOne', data).action(`${this.model.getModelName()}.${action}()`)
    return this.collection.insertOne(data).then(response => {
      return this.logger.end({
        result: response.result,
        insertedId: response.insertedId,
        insertedCount: response.insertedCount
      })
    })
  }

  async update<R = any>(shouldFillData: boolean = true, action: string = 'update'): Promise<R> {
    const filter = this.getFilter()
    if (isEmpty(filter)) {
      return false as any
    }

    if (shouldFillData) {
      this.fillData(false)
    }

    const modifiedData = this.getModifiedData()
    if (isEmpty(modifiedData)) {
      return false as any
    }

    const data = { $set: modifiedData }
    this.logRaw('updateOne', filter, data).action(`${this.model.getModelName()}.${action}()`)
    return this.collection.updateOne(filter, data).then(response => {
      return this.logger.end({
        result: response.result,
        upsertedId: response.upsertedId,
        upsertedCount: response.upsertedCount
      })
    })
  }

  async softDelete<R = any>(): Promise<R> {
    const isNew = this.model.isNew()
    this.fillTimestampsData(isNew)

    const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature()
    this.record.setAttribute(
      this.convention.formatFieldName(softDeletesFeature.getSoftDeletesSetting(this.model).deletedAt),
      Moment().toDate()
    )

    return isNew ? this.create(false, 'softDelete') : this.update(false, 'softDelete')
  }

  async hardDelete<R = any>(): Promise<R> {
    const filter = this.getFilter()
    if (isEmpty(filter)) {
      return false as any
    }

    this.logRaw('deleteOne', filter).action(`${this.model.getModelName()}.hardDelete()`)
    return this.collection.deleteOne(filter).then(response => {
      return this.logger.end({
        result: response.result,
        deletedCount: response.deletedCount
      })
    })
  }

  async restore<R = any>(): Promise<R> {
    const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature()
    const fieldName = softDeletesFeature.getSoftDeletesSetting(this.model).deletedAt

    this.fillTimestampsData(false)
    this.record.setAttribute(this.convention.formatFieldName(fieldName), this.convention.getNullValueFor(fieldName))
    return this.update(false, 'restore')
  }

  getModifiedData() {
    return this.record.getModified().reduce((data, name) => {
      data[this.convention.formatFieldName(name)] = this.record.getAttribute(name)
      return data
    }, {})
  }

  getFilter() {
    const primaryKeyValue = this.model.getPrimaryKey()
    if (!primaryKeyValue) {
      return {}
    }

    return { [this.convention.formatFieldName(this.model.getPrimaryKeyName())]: primaryKeyValue }
  }

  logRaw(func: string, ...args: any[]): MongodbQueryLog {
    const passed = []
    for (let i = 0, l = args.length; i < l; i++) {
      passed.push(args[i])
      if (i !== l - 1) {
        passed.push(',')
      }
    }
    return this.logger.raw('db.', this.collection.collectionName, `.${func}(`, ...passed, ')')
  }
}
