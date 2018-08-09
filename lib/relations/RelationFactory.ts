/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
/// <reference path="../definitions/relations/IRelationFactory.ts" />
/// <reference path="../definitions/relations/IHasOne.ts" />

import IModel = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IRelation = NajsEloquent.Relation.IRelation
import IHasOne = NajsEloquent.Relation.IHasOne

import './basic/HasOneRelation'
import { HasOneRelation as HasOne } from './basic/HasOneRelation'
import { make } from 'najs-binding'
import { NajsEloquent as NajsEloquentClasses } from '../constants'

export class RelationFactory {
  protected rootModel: IModel
  protected name: string
  protected relation: IRelation<any>

  constructor(rootModel: IModel, name: string) {
    this.rootModel = rootModel
    this.name = name
  }

  make<T extends IRelation<any>>(className: string, params: any[], modifier?: (relation: T) => void): T {
    if (!this.relation) {
      this.relation = make<T>(className, [this.rootModel, this.name, ...params])

      if (modifier) {
        modifier(this.relation as T)
      }
    }

    return this.relation as T
  }

  hasOne<T extends IModel>(model: string | ModelDefinition<any>, foreignKey?: string, localKey?: string): IHasOne<T> {
    return this.make<HasOne<T>>(NajsEloquentClasses.Relation.HasOneRelation, [])
  }
}
