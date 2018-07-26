import { Model } from '../../model/Model'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandle } from './MongodbQueryBuilderHandle'

export class MongodbModel extends Model {
  query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandle> {
    return super.query() as MongodbQueryBuilder<this, MongodbQueryBuilderHandle>
  }
}
