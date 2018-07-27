import { Model } from '../../model/Model'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'

export class MongodbModel extends Model {
  query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandler> {
    return super.query() as MongodbQueryBuilder<this, MongodbQueryBuilderHandler>
  }
}
