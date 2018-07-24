export declare class MongodbQueryLog {
    protected data: {
        raw: string;
        queryBuilderData: object;
        result?: any;
        query?: object;
        options?: object;
        name?: string;
        action?: string;
    };
    constructor();
    name(name: string): this;
    queryBuilderData(key: string, value: any): this;
    query(data: object): object;
    options(data: object | undefined): object | undefined;
    action(action: string): this;
    raw(raw: any): this;
    raw(...raw: any[]): this;
    end(result: any): any;
}
