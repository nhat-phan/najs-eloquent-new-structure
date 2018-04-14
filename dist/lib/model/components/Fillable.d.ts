/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class Fillable implements Najs.Contracts.Eloquent.Component {
    model: NajsEloquent.Model.IModel<any>;
    driver: Najs.Contracts.Eloquent.Driver<any>;
    "constructor"(model: NajsEloquent.Model.IModel<any>, driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getClassName(): string;
    extend(prototype: Object): void;
    static getFillable(this: NajsEloquent.Model.IModel<any>): string[];
    static getGuarded(this: NajsEloquent.Model.IModel<any>): string[];
    static markFillable(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static markGuarded(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
}
