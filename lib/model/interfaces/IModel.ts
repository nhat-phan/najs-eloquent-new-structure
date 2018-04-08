/// <reference path="IModelFillable.ts" />

namespace NajsEloquent.Model {
  export class IModelMembers<A> {
    protected attributes: A
  }

  export interface IModel<A> extends IModelMembers<A>, IModelFillable {
    getClassName(): string
  }
}
