import { MongodbQueryLog } from '../mongodb/MongodbQueryLog';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler';
import { Model as MongooseModel, Query as MongooseQuery } from 'mongoose';
export declare class MongooseQueryExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
    protected logger: MongodbQueryLog;
    protected mongooseModel: MongooseModel<any>;
    protected mongooseQuery: MongooseQuery<any> | undefined;
    protected hasMongooseQuery: boolean;
    protected modelName: string;
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
    getMongooseQuery(isFindOne: boolean): MongooseQuery<any>;
    passSelectToQuery(query: MongooseQuery<any>): void;
    passLimitToQuery(query: MongooseQuery<any>): void;
    passOrderingToQuery(query: MongooseQuery<any>): void;
    createQuery(findOne: boolean): MongooseQuery<any>;
}
