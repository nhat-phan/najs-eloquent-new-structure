import { Model } from '../../model/Model';
import { MongooseQueryBuilder } from './MongooseQueryBuilder';
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler';
export declare class MongooseModel extends Model {
    id?: string;
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    newQuery(): MongooseQueryBuilder<this, MongooseQueryBuilderHandler>;
}
