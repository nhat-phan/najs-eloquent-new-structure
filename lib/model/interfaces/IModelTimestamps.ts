namespace NajsEloquent.Model {
  export interface ITimestampsSetting {
    createdAt: string
    updatedAt: string
  }

  export interface IModelTimestamps {
    touch(): this

    hasTimestamps(): boolean

    getTimestampsSetting(): ITimestampsSetting | undefined
  }
}
