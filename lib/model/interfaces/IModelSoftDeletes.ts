namespace NajsEloquent.Model {
  export interface ISoftDeletesSetting {
    deletedAt: string
    overrideMethods: boolean | 'all' | string
  }

  export interface IModelSoftDeletes {
    hasSoftDeletes(): boolean

    getSoftDeleteSetting(): ISoftDeletesSetting | undefined

    forceDelete(): Promise<boolean>

    restore(): Promise<this>
  }
}
