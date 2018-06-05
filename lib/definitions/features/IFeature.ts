/// <reference path="../../contracts/Driver.ts" />

namespace NajsEloquent.Feature {
  export interface IFeature {
    attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void
  }
}
