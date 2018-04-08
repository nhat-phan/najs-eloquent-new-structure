declare namespace NajsEloquent.Model {
    interface IModelActiveRecord {
        delete(): Promise<boolean>;
        save(): Promise<this>;
        fresh(): Promise<this | null>;
    }
}
