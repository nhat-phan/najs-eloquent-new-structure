import { Model } from './Model'

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { DynamicAttribute } from './components/DynamicAttribute'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'

export class Eloquent<T extends Object = {}> extends Model<T> {
  /**
   * Model constructor.
   *
   * @param {Object|undefined} data
   */
  constructor(data?: Object) {
    super(data)
    if (data !== CREATE_SAMPLE) {
      EloquentComponentProvider.extend(this, Eloquent.prototype, this['driver'])
    }
  }

  getAttribute(key: string) {
    return super.getAttribute(key)
  }
}

EloquentComponentProvider.register(DynamicAttribute, 'dynamic-attribute', true)
