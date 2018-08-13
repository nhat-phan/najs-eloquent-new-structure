/// <reference path="../../definitions/model/IModel.ts" />

import { Collection } from 'mongodb'
import { MongodbQueryLog } from './MongodbQueryLog'
import { MongodbProviderFacade } from '../../facades/global/MongodbProviderFacade'

export class MongodbExecutor {
  protected logger: MongodbQueryLog
  protected collection: Collection
  protected collectionName: string

  constructor(model: NajsEloquent.Model.IModel, logger: MongodbQueryLog) {
    this.logger = logger
    this.collectionName = model.getRecordName()
    this.collection = MongodbProviderFacade.getDatabase().collection(this.collectionName)
  }
}
