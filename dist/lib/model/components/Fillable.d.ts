/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class Fillable implements Najs.Contracts.Eloquent.Component {
    getClassName(): string;
    extend(prototype: Object): void;
    static getFillable(this: NajsEloquent.Model.IModel<any>): string[];
    static getGuarded(this: NajsEloquent.Model.IModel<any>): string[];
    static markFillable(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static markGuarded(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static isFillable(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isGuarded(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static fill(this: NajsEloquent.Model.IModel<any>, data: Object): NajsEloquent.Model.IModel<any>;
    static forceFill(this: NajsEloquent.Model.IModel<any>, data: Object): NajsEloquent.Model.IModel<any>;
}
