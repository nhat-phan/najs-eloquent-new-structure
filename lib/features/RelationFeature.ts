/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRelationFeature.ts" />

import IModel = NajsEloquent.Model.IModel
import IRelation = NajsEloquent.Relation.IRelation
import IRelationFactory = NajsEloquent.Relation.IRelationFactory
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import IRelationData = NajsEloquent.Relation.IRelationData
import RelationDefinitions = NajsEloquent.Relation.RelationDefinitions

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { NajsEloquent as NajsEloquentClasses } from '../constants'
import { RelationDataBucket } from '../relations/RelationDataBucket'
import { RelationData } from '../relations/RelationData'
import { RelationPublicApi } from './mixin/RelationPublicApi'
// import { parse_string_with_dot_notation } from '../util/functions'

export class RelationFeature extends FeatureBase implements NajsEloquent.Feature.IRelationFeature {
  getPublicApi(): object {
    return RelationPublicApi
  }

  // attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
  //   Object.assign(prototype, this.getPublicApi())
  // }

  getFeatureName(): string {
    return 'Relation'
  }

  getClassName(): string {
    return NajsEloquentClasses.Feature.RelationFeature
  }

  makeDataBucket(model: IModel): IRelationDataBucket {
    return new RelationDataBucket()
  }

  makeFactory(model: IModel, accessor: string): IRelationFactory {
    return {} as any
    // return new RelationFactory(this, name, false)
  }

  getDataBucket(model: NajsEloquent.Model.IModel): IRelationDataBucket | undefined {
    return this.useInternalOf(model).relationDataBucket
  }

  setDataBucket(model: NajsEloquent.Model.IModel, dataBucket: IRelationDataBucket): void {
    this.useInternalOf(model).relationDataBucket = dataBucket
  }

  createKeyForDataBucket(model: NajsEloquent.Model.IModel): string {
    return this.useRecordManagerOf(model).getRecordName(model)
  }

  getDefinitions(model: IModel): RelationDefinitions {
    return this.useInternalOf(model).relationDefinitions
  }

  buildDefinitions(model: IModel, prototype: object, bases: object[]): RelationDefinitions {
    return {}
  }

  findByName<T = {}>(model: IModel, name: string): IRelation<T> {
    // const internalModel = this.useInternalOf(model)

    // const info = parse_string_with_dot_notation(name)
    // if (
    //   typeof internalModel.relationDefinitions === 'undefined' ||
    //   typeof internalModel.relationDefinitions[info.first] === 'undefined'
    // ) {
    //   throw new Error(`Relation "${info.first}" is not found in model "${internalModel.getModelName()}".`)
    // }

    // const definition = internalModel.relationDefinitions[info.first]
    // const relation: IRelation<T> =
    //   definition.targetType === 'getter'
    //     ? internalModel[definition.target]
    //     : internalModel[definition.target].call(this)

    // if (info.afterFirst) {
    //   relation.with(info.afterFirst)
    // }
    // return relation
    return {} as any
  }

  findDataByName<T>(model: IModel, name: string): IRelationData<T> {
    const internalModel = this.useInternalOf(model)

    if (typeof internalModel.relations[name] === 'undefined') {
      internalModel.relations[name] = new RelationData(this.makeFactory(model, name))
      this.defineAccessor(model, name)
    }

    return internalModel.relations[name]
  }

  defineAccessor(model: IModel, accessor: string): void {}
}
register(RelationFeature, NajsEloquentClasses.Feature.RelationFeature)
