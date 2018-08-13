import { MongodbExecutor } from './MongodbExecutor';
import { Collection } from 'mongodb';
import { MongodbQueryLog } from './MongodbQueryLog';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
export declare class MongodbQueryExecutor extends MongodbExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
    protected basicQuery: BasicQuery;
    protected queryHandler: MongodbQueryBuilderHandler;
    protected nativeHandlePromise: any;
    constructor(queryHandler: MongodbQueryBuilderHandler, basicQuery: BasicQuery, logger: MongodbQueryLog);
    get(): Promise<object[]>;
    first(): Promise<object | null>;
    count(): Promise<number>;
    update(data: Object): Promise<any>;
    delete(): Promise<any>;
    restore(): Promise<any>;
    native(handler: (collection: Collection, conditions: object, options?: object) => Promise<any>): {
        execute(): Promise<any>;
    };
    execute(): Promise<any>;
    makeQuery(): object;
    makeQueryOptions(): object | undefined;
}
