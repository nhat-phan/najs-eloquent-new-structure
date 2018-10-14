/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/relations/IRelationshipFactory.ts" />
/// <reference path="../definitions/relations/IHasOneRelationship.ts" />

import IModel = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IRelationship = NajsEloquent.Relation.IRelationship
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship
import IBelongsToRelationship = NajsEloquent.Relation.IBelongsToRelationship
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship

import './relationships/HasOne'
import { HasOne } from './relationships/HasOne'
import { BelongsTo } from './relationships/BelongsTo'
import { HasMany } from './relationships/HasMany'
import { make } from 'najs-binding'
import { parse_string_with_dot_notation } from '../util/functions'

export class RelationshipFactory {
  protected rootModel: IModel
  protected name: string
  protected relationship: IRelationship<any>

  constructor(rootModel: IModel, name: string) {
    this.rootModel = rootModel
    this.name = name
  }

  make<T extends IRelationship<any>>(className: string, params: any[], modifier?: (relation: T) => void): T {
    if (!this.relationship) {
      this.relationship = make<T>(className, [this.rootModel, this.name, ...params])

      if (modifier) {
        modifier(this.relationship as T)
      }
    }

    return this.relationship as T
  }

  findForeignKeyName(referencing: IModel, referenced: IModel) {
    const referencedNameParts = parse_string_with_dot_notation(referenced.getModelName())

    return referencing.formatAttributeName(referencedNameParts.last + '_id')
  }

  protected findHasOneOrHasManyKeys(target: ModelDefinition<any>, targetKey?: string, localKey?: string) {
    const targetKeyName =
      typeof targetKey === 'undefined' ? this.findForeignKeyName(make<IModel>(target), this.rootModel) : targetKey
    const rootKeyName = typeof localKey === 'undefined' ? this.rootModel.getPrimaryKeyName() : localKey

    return { targetKeyName, rootKeyName }
  }

  hasOne<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IHasOneRelationship<T> {
    const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey)

    return this.make<HasOne<T>>(HasOne.className, [target, keys.targetKeyName, keys.rootKeyName])
  }

  hasMany<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IHasManyRelationship<T> {
    const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey)

    return this.make<HasMany<T>>(HasMany.className, [target, keys.targetKeyName, keys.rootKeyName])
  }

  belongsTo<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IBelongsToRelationship<T> {
    const targetModel = make<IModel>(target)
    const targetKeyName = typeof targetKey === 'undefined' ? targetModel.getPrimaryKeyName() : targetKey
    const rootKeyName =
      typeof localKey === 'undefined' ? this.findForeignKeyName(this.rootModel, targetModel) : localKey

    const relationship = this.make<BelongsTo<T>>(BelongsTo.className, [target, targetKeyName, rootKeyName])
    return relationship
  }
}
