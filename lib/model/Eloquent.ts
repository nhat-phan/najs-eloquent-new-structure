/// <reference path="interfaces/IEloquent.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'
import { Fillable } from './components/Fillable'
import { Attribute } from './components/Attribute'
import { Serialization } from './components/Serialization'

function EloquentClass<T>(this: NajsEloquent.Model.IModel<T>, data?: Object | T) {
  const className = getClassName(this)
  if (!ClassRegistry.has(className)) {
    register(Object.getPrototypeOf(this).constructor, className)
  }

  if (data !== CREATE_SAMPLE) {
    this['driver'] = EloquentDriverProvider.create(this)
    this['attributes'] = this['driver'].getRecord()

    return EloquentComponentProvider.extend(this, this['driver'])
  }
}

const defaultComponents: Najs.Contracts.Eloquent.Component[] = [new Attribute(), new Fillable(), new Serialization()]
for (const component of defaultComponents) {
  component.extend(EloquentClass.prototype)
}

export const Eloquent: NajsEloquent.Model.IEloquent<{}> = <any>EloquentClass

// export class Model<A> extends NajsEloquent.Model.IModel<A> {}

// export class Model {}

// export interface Test {
//   doSomething(): void
// }

// export class Test {
//   constructor() {}
// }
