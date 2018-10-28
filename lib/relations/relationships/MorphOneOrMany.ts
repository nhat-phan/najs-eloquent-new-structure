// /// <reference path="../../definitions/model/IModel.ts" />
// /// <reference path="../../definitions/relations/IRelationship.ts" />
// /// <reference path="../../definitions/data/IDataCollector.ts" />
// /// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

// import Model = NajsEloquent.Model.IModel
// import ModelDefinition = NajsEloquent.Model.ModelDefinition
// import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType

// import { Relationship } from '../Relationship'
// import { DataConditionMatcher } from '../../data/DataConditionMatcher'
// import { RelationUtilities } from '../RelationUtilities'

// export abstract class MorphOneOrMany<T> extends Relationship<T> {
//   protected targetMorphTypeName: string

//   constructor(
//     root: Model,
//     relationName: string,
//     target: ModelDefinition,
//     targetType: string,
//     targetKey: string,
//     rootKey: string
//   ) {
//     super(root, relationName)
//     this.rootKeyName = rootKey
//     this.targetDefinition = target
//     this.targetMorphTypeName = targetType
//     this.targetKeyName = targetKey
//   }

//   abstract getClassName(): string

//   abstract getType(): string

//   abstract getExecutor(): IRelationshipExecutor<T>

//   protected get targetMorphType() {
//     return Relationship.findMorphType(this.targetModel)
//   }

//   collectData(): T | undefined | null {
//     const dataBucket = this.getDataBucket()
//     if (!dataBucket) {
//       return undefined
//     }

//     const dataBuffer = dataBucket.getDataOf(this.targetModel)
//     const collector = dataBuffer.getCollector()
//     const rootKey = this.rootModel.getAttribute(this.rootKeyName)
//     const reader = dataBuffer.getDataReader()

//     collector.filterBy({
//       $and: [
//         new DataConditionMatcher(this.targetMorphTypeName, '=', this.targetMorphType, reader),
//         new DataConditionMatcher(this.targetKeyName, '=', rootKey, reader)
//       ]
//     })
//     return this.getExecutor().executeCollector(collector)
//   }

//   async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
//     const query = this.createTargetQuery(`${this.getType()}:${this.targetModel.getModelName()}`)

//     if (type === 'lazy') {
//       query
//         .where(this.targetMorphTypeName, this.targetMorphType)
//         .where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName))
//     } else {
//       const dataBucket = this.getDataBucket()
//       if (!dataBucket) {
//         return this.getExecutor().getEmptyValue()
//       }

//       const ids = RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName)
//       query.where(this.targetMorphTypeName, this.targetMorphType).whereIn(this.targetKeyName, ids)
//     }

//     return this.getExecutor().executeQuery(query)
//   }

//   isInverseOf<K>(relationship: NajsEloquent.Relation.IRelationship<K>): boolean {
//     return false
//   }
// }
