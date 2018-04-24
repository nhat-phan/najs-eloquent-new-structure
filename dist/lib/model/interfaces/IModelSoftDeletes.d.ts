declare namespace NajsEloquent.Model {
    interface ISoftDeletesSetting {
        deletedAt: string;
        overrideMethods: boolean | 'all' | string;
    }
    class IModelSoftDeletes {
        protected softDeletes?: ISoftDeletesSetting | boolean;
    }
    interface IModelSoftDeletes {
        hasSoftDeletes(): boolean;
        getSoftDeletesSetting(): ISoftDeletesSetting | undefined;
        forceDelete(): Promise<boolean>;
        restore(): Promise<this>;
    }
}
