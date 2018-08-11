import { Model } from '../../model/Model'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { MongodbDriver } from './MongodbDriver'
import { bind_driver_if_needed } from '../../util/binding'
import { Collection } from 'mongodb'

export class MongodbModel extends Model {
  public id?: string

  protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T> {
    bind_driver_if_needed(this.getModelName(), MongodbDriver.name, MongodbDriver)

    return super.makeDriver()
  }

  newQuery(): MongodbQueryBuilder<this, MongodbQueryBuilderHandler> {
    return super.newQuery() as MongodbQueryBuilder<this, MongodbQueryBuilderHandler>
  }

  getNativeCollection<T>(): Collection<T> {
    return this.newQuery().collection()
  }
}
