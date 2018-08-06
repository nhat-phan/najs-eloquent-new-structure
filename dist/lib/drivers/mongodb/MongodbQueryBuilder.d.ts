/// <reference path="../../definitions/model/IModel.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
import { Collection } from 'mongodb';
export declare class MongodbQueryBuilder<T extends IModel, H extends MongodbQueryBuilderHandler = MongodbQueryBuilderHandler> extends QueryBuilder<T, H> {
    native(handler: (collection: Collection, conditions: object, options?: object) => Promise<any>): {
        execute(): Promise<any>;
    };
    collection(): Collection<any>;
}
