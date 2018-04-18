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
      EloquentComponentProvider.extend(this, this['driver'])
    }
  }

  // /**
  //  * Set the query with given name
  //  *
  //  * @param {string} name
  //  */
  // queryName(name: string): NajsEloquent.QueryBuilder.IQueryBuilder<Model<T> & T> {
  //   return <any>{}
  // }
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
//   const result = await test.queryName('test').first()
//   result.
// }
// run()
