namespace NajsEloquent.Model {
  export interface ITimestampsSetting {
    createdAt: string
    updatedAt: string
  }

  export class IModelTimestamps {
    /**
     * Timestamps setting.
     */
    protected timestamps?: ITimestampsSetting | boolean
  }
  export interface IModelTimestamps {
    /**
     * Determine the model is using timestamps or not.
     */
    hasTimestamps(): boolean

    /**
     * Get timestamps setting.
     *
     * Note: It's returns default timestamps even the model is not using timestamps.
     */
    getTimestampsSetting(): ITimestampsSetting

    /**
     * Update the model's update timestamp.
     */
    touch(): this
  }
}
