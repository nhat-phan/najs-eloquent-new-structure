declare namespace NajsEloquent.Model {
    interface IModelAttribute {
        id?: any;
        hasAttribute(key: string): boolean;
        getAttribute(key: string): any;
        setAttribute(key: string, value: any): this;
        getPrimaryKey(): any;
        setPrimaryKey(id: any): this;
        getPrimaryKeyName(): string;
    }
}
