declare namespace NajsEloquent.Model {
    interface IModelAttribute<RecordType> {
        id?: any;
        getAttribute(name: string): any;
        setAttribute(name: string): void;
        getPrimaryKey(): any;
        setPrimaryKey(id: any): void;
        getPrimaryKeyName(): string;
    }
}
