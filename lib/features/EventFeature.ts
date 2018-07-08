/// <reference types="najs-event" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IEventFeature.ts" />

import { EventEmitterFactory } from 'najs-event'
import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { EventPublicApi } from './EventPublicApi'
import { NajsEloquent } from '../constants'

export class EventFeature extends FeatureBase implements NajsEloquent.Feature.IEventFeature {
  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    Object.assign(prototype, EventPublicApi)
  }

  getFeatureName(): string {
    return 'Event'
  }

  getClassName(): string {
    return NajsEloquent.Feature.EventFeature
  }

  async fire(model: NajsEloquent.Model.IModel, eventName: string, args: any): Promise<void> {
    await this.getEventEmitter(model).emit(eventName, args)

    return this.getGlobalEventEmitter(model).emit(eventName, model, args)
  }

  getEventEmitter(model: NajsEloquent.Model.IModel): Najs.Contracts.Event.AsyncEventEmitter {
    if (!model['eventEmitter']) {
      model['eventEmitter'] = EventEmitterFactory.create(true)
    }
    return model['eventEmitter']!
  }

  getGlobalEventEmitter(model: NajsEloquent.Model.IModel): Najs.Contracts.Event.AsyncEventEmitter {
    return model.getDriver().getGlobalEventEmitter()
  }
}
register(EventFeature, NajsEloquent.Feature.EventFeature)
