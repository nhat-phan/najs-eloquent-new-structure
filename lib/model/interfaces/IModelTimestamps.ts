namespace NajsEloquent.Model {
  export interface ITimestampsSetting {
    createdAt: string
    updatedAt: string
  }

  export class IModelTimestamps {
    protected timestamps?: ITimestampsSetting | boolean
  }
  export interface IModelTimestamps {
    touch(): this

    hasTimestamps(): boolean

    getTimestampsSetting(): ITimestampsSetting
  }
}
