/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelEvent.ts" />

export const EventPublicApi: NajsEloquent.Model.IModelEvent = {
  fire(this: NajsEloquent.Model.IModel, eventName: string, args: any): Promise<void> {
    return this['driver'].getEventFeature().fire(this, eventName, args)
  },

  emit(this: NajsEloquent.Model.IModel, eventName: string, eventData?: any, serial?: boolean): Promise<void> {
    return this['driver']
      .getEventFeature()
      .getEventEmitter(this)
      .emit(eventName, eventData, serial)
  },

  on(this: NajsEloquent.Model.IModel, eventName: string, listener: Function) {
    this['driver']
      .getEventFeature()
      .getEventEmitter(this)
      .on(eventName, listener)

    return this
  },

  off(this: NajsEloquent.Model.IModel, eventName: string, listener: Function) {
    this['driver']
      .getEventFeature()
      .getEventEmitter(this)
      .off(eventName, listener)

    return this
  },

  once(this: NajsEloquent.Model.IModel, eventName: string, listener: Function) {
    this['driver']
      .getEventFeature()
      .getEventEmitter(this)
      .once(eventName, listener)

    return this
  }
}
