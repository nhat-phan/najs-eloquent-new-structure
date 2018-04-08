declare namespace NajsEloquent.Model {
    interface ITimestampsSetting {
        createdAt: string;
        updatedAt: string;
    }
    interface IModelTimestamps {
        touch(): this;
        hasTimestamps(): boolean;
        getTimestampsSetting(): ITimestampsSetting | undefined;
    }
}
