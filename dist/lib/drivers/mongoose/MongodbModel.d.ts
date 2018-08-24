import { Model } from '../../model/Model';
import { MongooseQueryBuilder } from './MongooseQueryBuilder';
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler';
import { SchemaDefinition, SchemaOptions } from 'mongoose';
export declare class MongooseModel extends Model {
    id?: string;
    protected schema?: SchemaDefinition;
    protected options?: SchemaOptions;
    protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
    newQuery(): MongooseQueryBuilder<this, MongooseQueryBuilderHandler>;
}
