/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../query-builders/IQueryBuilder.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IModelWithPivot<T> {
        pivot: Model.IModel & T;
    }
}
