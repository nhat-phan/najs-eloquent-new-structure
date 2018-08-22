import { MongodbQueryLog } from '../mongodb/MongodbQueryLog';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler';
import { Model as MongooseModel } from 'mongoose';
export declare class MongooseQueryExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
    protected logger: MongodbQueryLog;
    protected mongooseModel: MongooseModel<any>;
    protected basicQuery: BasicQuery;
    protected queryHandler: MongooseQueryBuilderHandler;
    protected nativeHandlePromise: any;
    constructor(queryHandler: MongooseQueryBuilderHandler, mongooseModel: MongooseModel<any>, logger: MongodbQueryLog);
    get(): Promise<object[]>;
    first(): Promise<object | null>;
    count(): Promise<number>;
    update(data: Object): Promise<any>;
    delete(): Promise<any>;
    restore(): Promise<any>;
    execute(): Promise<any>;
}
