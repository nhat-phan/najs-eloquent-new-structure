export interface IQueryLogData {
    raw: string;
    result?: any;
    name?: string;
    action?: string;
}
export declare abstract class QueryLogBase<T extends IQueryLogData> {
    protected data: T;
    constructor();
    abstract getDefaultData(): T;
    name(name: string): this;
    action(action: string): this;
    raw(raw: any): this;
    raw(...raw: any[]): this;
    end(result: any): any;
}
