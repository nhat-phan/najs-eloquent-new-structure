/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class Fillable implements Najs.Contracts.Eloquent.Component {
    model: NajsEloquent.Model.IModel<any>;
    driver: Najs.Contracts.Eloquent.Driver<any>;
    "constructor"(model: NajsEloquent.Model.IModel<any>, driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getClassName(): string;
    extend(prototype: Object): void;
    getFillable(this: NajsEloquent.Model.IModel<any>): string[];
}
