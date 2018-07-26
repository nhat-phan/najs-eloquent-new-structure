import { Model } from '../../model/Model';
import { MongodbQueryBuilder } from './MongodbQueryBuilder';
import { MongodbQueryBuilderHandle } from './MongodbQueryBuilderHandle';
export declare class MongodbModel extends Model {
    query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandle>;
}
