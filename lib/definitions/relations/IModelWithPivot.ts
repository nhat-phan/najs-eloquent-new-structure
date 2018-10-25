/// <reference path="../collect.js/index.d.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../query-builders/IQueryBuilder.ts" />

namespace NajsEloquent.Relation {
  export interface IModelWithPivot<T> {
    pivot: Model.IModel & T
  }
}
