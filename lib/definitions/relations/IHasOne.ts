namespace NajsEloquent.Relation {
  export interface IHasOne<T> extends IRelation<T> {
    associate(model: T): this

    dissociate(): this
  }
}
