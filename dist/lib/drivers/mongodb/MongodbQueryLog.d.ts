import { QueryLogBase, IQueryLogData } from './../QueryLogBase';
export interface IMongodbQueryLogData extends IQueryLogData {
    query?: object;
    options?: object;
}
export declare class MongodbQueryLog extends QueryLogBase<IMongodbQueryLogData> {
    getDefaultData(): IMongodbQueryLogData;
    query(data: object): object;
    options(data: object | undefined): object | undefined;
}
