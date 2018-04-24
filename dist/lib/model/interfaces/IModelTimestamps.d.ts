declare namespace NajsEloquent.Model {
    interface ITimestampsSetting {
        createdAt: string;
        updatedAt: string;
    }
    class IModelTimestamps {
        protected timestamps?: ITimestampsSetting | boolean;
    }
    interface IModelTimestamps {
        touch(): this;
        hasTimestamps(): boolean;
        getTimestampsSetting(): ITimestampsSetting;
    }
}
