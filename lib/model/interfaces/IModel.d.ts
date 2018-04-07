/// <reference path="./IModelFillable.d.ts" />

namespace Najs {
  namespace Database {
    export class IModelMembers<A> {
      protected attributes: A
    }

    export interface IModel<A> extends IModelMembers<A>, IModelFillable {}
  }
}
