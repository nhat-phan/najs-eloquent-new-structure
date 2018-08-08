import { RelationBase } from './RelationBase'
import IModel = NajsEloquent.Model.IModel

export class RelationUtilities<T> {
  protected relation: RelationBase<T>

  constructor(relation: RelationBase<T>) {
    this.relation = relation
  }

  extractSamplesFrom(result: CollectJs.Collection<Model>): Model[] {
    return []
  }

  isRelationLoadedInDataBucket(model: IModel, relationName: string) {
    const bucket = this.relation.getDataBucket()
    if (!bucket) {
      return false
    }

    return (
      bucket
        .getMetadata(model)
        .get<string[]>('loaded', [])
        .indexOf(relationName) !== -1
    )
  }

  setRelationLoadedInDataBucket(model: IModel, relationName: string) {
    const bucket = this.relation.getDataBucket()
    if (!bucket) {
      return
    }

    const metadata = bucket.getMetadata(model)

    if (!metadata.exists('loaded')) {
      metadata.set('loaded', [])
    }
    metadata.get<string[]>('loaded').push(relationName)
  }
}
