/// <reference path="interfaces/IModelQuery.ts" />

import { make, register } from 'najs-binding'
import { Model } from './Model'
import { CREATE_SAMPLE } from '../util/ClassSetting'
import { DynamicAttribute } from './components/DynamicAttribute'
import { ModelQuery } from './components/ModelQuery'
import { StaticQuery } from './components/StaticQuery'
import { EloquentProxy } from './EloquentProxy'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'

export interface Eloquent<T extends Object = {}> extends NajsEloquent.Model.IModelQuery<T> {}
export class Eloquent<T extends Object = {}> extends Model<T> {
  /**
   * Model constructor.
   *
   * @param {Object|undefined} data
   */
  constructor(data?: Object) {
    super(data)
    if (data !== CREATE_SAMPLE) {
      EloquentComponentProvider.extend(this, this.driver)
      if (this.driver.useEloquentProxy()) {
        return new Proxy(this, EloquentProxy)
      }
    }
  }

  static register(model: { new (): Eloquent }) {
    register(model)
    Reflect.construct(model, [])
  }
}

const defaultComponents: Najs.Contracts.Eloquent.Component[] = [make(ModelQuery.className), make(StaticQuery.className)]
for (const component of defaultComponents) {
  component.extend(Eloquent.prototype, [], <any>{})
}

EloquentComponentProvider.register(DynamicAttribute, 'dynamic-attribute', true)

// async function run() {
//   interface IUser {
//     first_name: string
//     last_name: string
//   }

//   interface UserMethods {
//     doSomething(): void
//   }

//   class User extends Eloquent<IUser & UserMethods> implements UserMethods {
//     doSomething() {}
//   }

//   const test = new User()
//   const result = await test
//     .select(['id', 'created_at'])
//     .orderBy('id')
//     .where('id', 1)
//     .get()
// }
// run()
