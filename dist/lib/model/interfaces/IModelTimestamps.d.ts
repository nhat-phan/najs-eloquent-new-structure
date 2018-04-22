declare namespace NajsEloquent.Model {
    interface ITimestampsSetting {
        createdAt: string;
        updatedAt: string;
    }
    class IModelTimestamps {
        protected timestamps?: ITimestampsSetting;
    }
    interface IModelTimestamps {
        touch(): this;
        hasTimestamps(): boolean;
        getTimestampsSetting(): ITimestampsSetting | undefined;
    }
}
