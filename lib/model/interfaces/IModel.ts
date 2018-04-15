/// <reference path="../../contracts/Driver.ts" />
/// <reference path="IModelFillable.ts" />

namespace NajsEloquent.Model {
  export class IModelMembers<A> {
    /**
     * The model's attributes.
     */
    protected attributes: A

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver<A>
  }

  export interface IModel<A> extends IModelMembers<A>, IModelAttribute, IModelFillable {
    getClassName(): string
  }
}
