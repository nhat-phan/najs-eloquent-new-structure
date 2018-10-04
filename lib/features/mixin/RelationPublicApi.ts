/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRelation.ts" />

import Model = NajsEloquent.Model.ModelInternal
import IRelationship = NajsEloquent.Relation.IRelationship
import IRelationshipFactory = NajsEloquent.Relation.IRelationshipFactory

export const RelationPublicApi: NajsEloquent.Model.IModelRelation = {
  getRelationshipByName<T = any>(this: Model, name: string): IRelationship<T> {
    return this.driver.getRelationFeature().findByName(this, name)
  },

  defineRelation(this: Model, name: string): IRelationshipFactory {
    return this.driver
      .getRelationFeature()
      .findDataByName(this, name)
      .getFactory()
  }
}
