/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationReference.ts" />
import Model = NajsEloquent.Model.IModel
import IRelationReference = NajsEloquent.Relation.IRelationReference
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import { make } from 'najs-binding'

export class RelationReference<Root extends Model, Target extends Model> implements IRelationReference<Root, Target> {
  protected root: Root
  protected target: Target
  protected targetName: string

  constructor(root: Root) {
    this.root = root
  }

  getRootModel(): Root {
    return this.root
  }

  getTargetModel(): Target {
    if (!this.target) {
      this.target = make<Target>(this.targetName)
    }
    return this.target
  }

  getInfo(): object {
    return {
      root: { model: this.root.getModelName() },
      target: { model: this.getTargetModel().getModelName() }
    }
  }

  getQuery(): IQueryBuilder<Target> {
    return this.target.newQuery()
  }
}
