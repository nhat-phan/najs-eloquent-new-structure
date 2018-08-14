import { Collection } from 'mongodb';
import { MongodbQueryLog } from './MongodbQueryLog';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
export declare class MongodbQueryExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
    protected logger: MongodbQueryLog;
    protected collection: Collection;
    protected collectionName: string;
    protected basicQuery: BasicQuery;
    protected queryHandler: MongodbQueryBuilderHandler;
    protected nativeHandlePromise: any;
    constructor(queryHandler: MongodbQueryBuilderHandler, collection: Collection, logger: MongodbQueryLog);
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
    getCollection(): Collection<any>;
    makeQuery(): object;
    makeQueryOptions(): object | undefined;
    logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog;
}
