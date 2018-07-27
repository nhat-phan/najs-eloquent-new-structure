import { Collection } from 'mongodb';
import { MongodbQueryLog } from './MongodbQueryLog';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
import { MongodbConditionConverter } from '../../query-builders/shared/MongodbConditionConverter';
export declare class MongodbExecutor implements NajsEloquent.QueryBuilder.IExecutor {
    protected logger: MongodbQueryLog;
    protected basicQuery: BasicQuery;
    protected queryHandler: MongodbQueryBuilderHandler;
    protected collection: Collection;
    protected collectionName: string;
    constructor(queryHandler: MongodbQueryBuilderHandler, basicQuery: BasicQuery, logger: MongodbQueryLog);
    get(): Promise<object[]>;
    first(): Promise<object | null>;
    count(): Promise<number>;
    update(data: Object): Promise<any>;
    delete(): Promise<any>;
    restore(): Promise<any>;
    execute(): Promise<any>;
    logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog;
    getQuery(): object;
    resolveMongodbConditionConverter(conditions: object[]): MongodbConditionConverter;
    getQueryOptions(): object | undefined;
}
