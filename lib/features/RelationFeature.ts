/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRelationFeature.ts" />

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { NajsEloquent } from '../constants'
import { RelationDataBucket } from '../relations/RelationDataBucket'

export class RelationFeature extends FeatureBase implements NajsEloquent.Feature.IRelationFeature {
  getPublicApi(): object {
    return {}
  }

  getFeatureName(): string {
    return 'Relation'
  }

  getClassName(): string {
    return NajsEloquent.Feature.RelationFeature
  }

  makeDataBucket(model: NajsEloquent.Model.IModel): NajsEloquent.Relation.IRelationDataBucket {
    return new RelationDataBucket()
  }

  getDataBucket(model: NajsEloquent.Model.IModel): NajsEloquent.Relation.IRelationDataBucket | undefined {
    return this.useInternalOf(model).relationDataBucket
  }

  setDataBucket(model: NajsEloquent.Model.IModel, dataBucket: NajsEloquent.Relation.IRelationDataBucket): void {
    this.useInternalOf(model).relationDataBucket = dataBucket
  }

  createKeyForDataBucket(model: NajsEloquent.Model.IModel): string {
    return this.useRecordManagerOf(model).getRecordName(model)
  }
}
register(RelationFeature, NajsEloquent.Feature.RelationFeature)
