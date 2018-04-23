/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class ModelFillable implements Najs.Contracts.Eloquent.Component {
    static className: string;
    getClassName(): string;
    extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    static getFillable: NajsEloquent.Model.ModelMethod<string[]>;
    static getGuarded: NajsEloquent.Model.ModelMethod<string[]>;
    static markFillable(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static markGuarded(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static isFillable(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isGuarded(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static fill(this: NajsEloquent.Model.IModel<any>, data: Object): NajsEloquent.Model.IModel<any>;
    static forceFill(this: NajsEloquent.Model.IModel<any>, data: Object): NajsEloquent.Model.IModel<any>;
}
