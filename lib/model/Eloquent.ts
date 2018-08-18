/// <reference path="../definitions/model/IEloquent.ts" />

import { Model } from './Model'

import IEloquent = NajsEloquent.Model.IEloquent
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

export interface EloquentStatic<T> extends NajsEloquent.Model.IEloquentStatic<T, IQueryBuilder<Model & T>> {}

export interface Eloquent<T> extends IEloquent<T, IQueryBuilder<Model & T>> {}
export class Eloquent<T> extends Model {
  static Class<T>(): EloquentStatic<T> {
    return this as any
  }
}

// class User extends Eloquent.Class<User>() {
//   name: string
// }

// async function test() {
//   const result = await User.firstOrFail('test')

//   result.name
// }
