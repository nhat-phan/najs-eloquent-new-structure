/// <reference path="../../contracts/ModelComponent.ts" />

import { register } from 'najs-binding'
import { in_array } from '../../util/in_array'
import { NajsEloquent } from '../../constants'

const VARIABLES = ['fillable', 'guarded']
const METHODS = ['fill', 'forceFill']

export class Fillable implements Najs.Contracts.Eloquent.ModelComponent {
  getClassName(): string {
    return NajsEloquent.Model.Component.Fillable
  }

  isGetter(key: string | symbol, model: any): boolean {
    return in_array(key, VARIABLES, METHODS)
  }

  proxifyGetter(model: any, key: string | symbol): any {}

  isSetter(key: string | symbol, value: any, model: any): any {
    return false
  }

  proxifySetter(model: any, key: string | symbol, value: any): boolean {
    return true
  }
}
register(Fillable)
