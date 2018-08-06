import { Model } from '../../model/Model'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { MongodbDriver } from './MongodbDriver'
import { bindDriverIfNeeded } from '../../util/register'
import { Collection } from 'mongodb'

export class MongodbModel extends Model {
  protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T> {
    bindDriverIfNeeded(this.getModelName(), MongodbDriver.name, MongodbDriver)

    return super.makeDriver()
  }

  query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandler> {
    return super.query() as MongodbQueryBuilder<this, MongodbQueryBuilderHandler>
  }

  getNativeCollection<T>(): Collection<T> {
    return this.query().collection()
  }
}
