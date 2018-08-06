import { Model } from '../../model/Model';
import { MongodbQueryBuilder } from './MongodbQueryBuilder';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
import { Collection } from 'mongodb';
export declare class MongodbModel extends Model {
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    query(): MongodbQueryBuilder<this, MongodbQueryBuilderHandler>;
    getNativeCollection<T>(): Collection<T>;
}
