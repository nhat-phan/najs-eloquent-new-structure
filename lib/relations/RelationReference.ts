/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationReference.ts" />
import Model = NajsEloquent.Model.IModel
import IRelationReference = NajsEloquent.Relation.IRelationReference
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import { make } from 'najs-binding'

export class RelationReference<Root extends Model, Target extends Model> implements IRelationReference<Root, Target> {
  protected root: Root
  protected rootKeyName: string | undefined

  protected target: Target
  protected targetName: string
  protected targetKeyName: string | undefined

  constructor(root: Root) {
    this.root = root
  }

  getRootModel(): Root {
    return this.root
  }

  getRootKeyName(): string {
    return this.rootKeyName || this.root.getPrimaryKeyName()
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

  createQueryByRootPrimaryKey() {}

  createQueryByRootPrimaryKeys(ids: any[]) {}

  queryThrough() {
    // const Book: any = {}
    // const Author: any = {}
    // const pivotTable = Book.Pivot
    // Author.whereIn('id', pivotTable.select('author_id').whereIn('id', Book.ids))
    // class Book {
    //   authors: Author[]
    //   get authorsRelation() {
    //     const factory: any = {}
    //     return factory.define('authors').belongsToMany(Author)
    //   }
    // }
    // class Author {}
  }
}
