namespace NajsEloquent.Model {
  export interface ISoftDeletesSetting {
    deletedAt: string
    overrideMethods: boolean | 'all' | string
  }

  export class IModelSoftDeletes {
    protected softDeletes?: ISoftDeletesSetting | boolean
  }
  export interface IModelSoftDeletes {
    hasSoftDeletes(): boolean

    getSoftDeletesSetting(): ISoftDeletesSetting | undefined

    forceDelete(): Promise<boolean>

    restore(): Promise<this>
  }
}
