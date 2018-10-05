/// <reference path="../collect.js/index.d.ts"

namespace NajsEloquent.Relation {
  export interface IHasManyRelationship<T> extends IRelationship<CollectJs.Collection<T>> {
    // associate(model: T): this
    // dissociate(): this
  }
}
