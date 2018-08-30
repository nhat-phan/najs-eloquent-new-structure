import { Model } from '../../model/Model'
import { MongooseQueryBuilder } from './MongooseQueryBuilder'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { MongooseDriver } from './MongooseDriver'
import { bind_driver_if_needed } from '../../util/binding'
import { PrototypeManager } from '../../util/PrototypeManager'
import { Document, Model as NativeModel, SchemaDefinition, SchemaOptions } from 'mongoose'

export class MongooseModel extends Model {
  public id?: string
  protected schema?: SchemaDefinition
  protected options?: SchemaOptions

  protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T> {
    bind_driver_if_needed(this.getModelName(), MongooseDriver.name, MongooseDriver)

    return super.makeDriver()
  }

  newQuery(): MongooseQueryBuilder<this, MongooseQueryBuilderHandler> {
    return super.newQuery() as MongooseQueryBuilder<this, MongooseQueryBuilderHandler>
  }

  getNativeModel(): NativeModel<Document & this> {
    return this.newQuery().nativeModel()
  }
}

PrototypeManager.stopFindingRelationsIn(MongooseModel.prototype)
