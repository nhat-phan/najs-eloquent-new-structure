/// <reference path="../../definitions/model/IModel.d.ts" />
import { Collection } from 'mongodb';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbExecutor {
    protected logger: MongodbQueryLog;
    protected collection: Collection;
    protected collectionName: string;
    constructor(model: NajsEloquent.Model.IModel, logger: MongodbQueryLog);
    getCollection(): Collection<any>;
    logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog;
}
