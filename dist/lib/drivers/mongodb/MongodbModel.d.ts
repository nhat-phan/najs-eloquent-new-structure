import { Model } from '../../model/Model';
import { MongodbQueryBuilder } from './MongodbQueryBuilder';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
export declare class MongodbModel extends Model {
    query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandler>;
}
