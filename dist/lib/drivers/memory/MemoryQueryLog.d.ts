import { QueryLogBase, IQueryLogData } from '../QueryLogBase';
export declare class MemoryQueryLog extends QueryLogBase<IQueryLogData> {
    getDefaultData(): IQueryLogData;
}
