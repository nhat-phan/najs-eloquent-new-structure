/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />

import IConvention = NajsEloquent.QueryBuilder.IConvention
import Model = NajsEloquent.Model.IModel
import { ExecutorBase } from '../ExecutorBase'
import { Document } from 'mongoose'
import { MongodbQueryLog } from '../mongodb/MongodbQueryLog'
import { MongodbConvention } from '../mongodb/MongodbConvention'

export class MongooseRecordExecutor extends ExecutorBase implements NajsEloquent.Feature.IRecordExecutor {
  protected model: NajsEloquent.Model.IModel
  protected document: Document
  protected logger: MongodbQueryLog
  protected convention: IConvention

  constructor(model: Model, document: Document, logger: MongodbQueryLog) {
    super()
    this.model = model
    this.document = document
    this.logger = logger
    this.convention = new MongodbConvention()
  }

  async create<R = any>(): Promise<R> {
    const result = this.shouldExecute() ? await this.document.save() : {}
    return this.logRaw('save')
      .action(`${this.model.getModelName()}.create()`)
      .end(result)
  }

  async update<R = any>(): Promise<R> {
    const result = this.shouldExecute() ? await this.document.save() : {}
    return this.logRaw('save')
      .action(`${this.model.getModelName()}.update()`)
      .end(result)
  }

  async softDelete<R = any>(): Promise<R> {
    const result = this.shouldExecute() ? await this.document['delete']() : {}
    return this.logRaw('delete')
      .action(`${this.model.getModelName()}.softDelete()`)
      .end(result)
  }

  async hardDelete<R = any>(): Promise<R> {
    const result = this.shouldExecute() ? await this.document.remove() : {}
    return this.logRaw('remove')
      .action(`${this.model.getModelName()}.hardDelete()`)
      .end(result)
  }

  async restore<R = any>(): Promise<R> {
    const result = this.shouldExecute() ? await this.document['restore']() : {}
    return this.logRaw('restore')
      .action(`${this.model.getModelName()}.restore()`)
      .end(result)
  }

  logRaw(func: string): MongodbQueryLog {
    return this.logger.raw(this.document.modelName || this.model.getModelName(), `.${func}()`)
  }
}
