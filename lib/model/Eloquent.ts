/// <reference path="../definitions/model/IEloquent.ts" />

import IEloquent = NajsEloquent.Model.IEloquent
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import { Model } from './Model'
import { EloquentPublicApi } from './mixin/EloquentPublicApi'
import { EloquentStaticPublicApi } from './mixin/EloquentStaticPublicApi'
import { PrototypeManager } from '../util/PrototypeManager'

export interface EloquentStatic<T> extends NajsEloquent.Model.IEloquentStatic<T, IQueryBuilder<Model & T>> {}

export interface Eloquent<T> extends IEloquent<T, IQueryBuilder<Model & T>> {}
export class Eloquent<T> extends Model {
  static Class<T>(): EloquentStatic<T> {
    return this as any
  }
}

Object.assign(Eloquent.prototype, EloquentPublicApi)
Object.assign(Eloquent, EloquentStaticPublicApi)
PrototypeManager.stopFindingRelationsIn(Eloquent.prototype)
