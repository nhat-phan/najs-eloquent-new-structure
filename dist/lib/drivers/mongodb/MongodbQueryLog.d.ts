import { QueryLogBase, IQueryLogData } from './../QueryLogBase';
export interface IMongodbQueryLogData extends IQueryLogData {
    queryBuilderData: object;
    query?: object;
    options?: object;
}
export declare class MongodbQueryLog extends QueryLogBase<IMongodbQueryLogData> {
    getDefaultData(): IMongodbQueryLogData;
    queryBuilderData(key: string, value: any): this;
    query(data: object): object;
    options(data: object | undefined): object | undefined;
}
