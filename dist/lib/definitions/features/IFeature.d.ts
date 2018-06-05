/// <reference path="../../contracts/Driver.d.ts" />
declare namespace NajsEloquent.Feature {
    interface IFeature {
        attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    }
}
