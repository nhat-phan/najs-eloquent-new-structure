/// <reference path="../../contracts/Driver.ts" />
/// <reference path="IModelAttribute.ts" />
/// <reference path="IModelFillable.ts" />
/// <reference path="IModelSerialization.ts" />

namespace NajsEloquent.Model {
  export class IModel<A> {
    /**
     * The model's attributes.
     */
    protected attributes: A

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver<A>
  }

  export interface IModel<A> extends IModelAttribute, IModelFillable, IModelSerialization {
    getClassName(): string
  }
}
