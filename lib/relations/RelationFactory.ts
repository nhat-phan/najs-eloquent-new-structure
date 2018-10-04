/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
/// <reference path="../definitions/relations/IRelationFactory.ts" />
/// <reference path="../definitions/relations/IHasOne.ts" />

import IModel = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IRelation = NajsEloquent.Relation.IRelation
import IHasOne = NajsEloquent.Relation.IHasOne

import './relationships/HasOne'
import { HasOne } from './relationships/HasOne'
import { make } from 'najs-binding'
import { parse_string_with_dot_notation } from '../util/functions'

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

  findForeignKeyName(referencing: ModelDefinition<any>, referenced: IModel) {
    const referencingModel = make<IModel>(referencing)
    const referencedNameParts = parse_string_with_dot_notation(referenced.getModelName())

    return referencingModel.formatAttributeName(referencedNameParts.last + '_id')
  }

  hasOne<T extends IModel>(target: ModelDefinition<any>, targetKey?: string, localKey?: string): IHasOne<T> {
    const targetKeyName = typeof targetKey === 'undefined' ? this.findForeignKeyName(target, this.rootModel) : targetKey
    const rootKeyName = typeof localKey === 'undefined' ? this.rootModel.getPrimaryKeyName() : localKey

    return this.make<HasOne<T>>(HasOne.className, [target, targetKeyName, rootKeyName])
  }
}
