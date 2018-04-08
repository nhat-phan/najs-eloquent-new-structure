declare namespace NajsEloquent.Model {
    interface ISoftDeletesSetting {
        deletedAt: string;
        overrideMethods: boolean | 'all' | string;
    }
    interface IModelSoftDeletes {
        hasSoftDeletes(): boolean;
        getSoftDeleteSetting(): ISoftDeletesSetting | undefined;
        forceDelete(): Promise<boolean>;
        restore(): Promise<this>;
    }
}
