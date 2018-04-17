/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class Serialization implements Najs.Contracts.Eloquent.Component {
    getClassName(): string;
    extend(prototype: Object, eloquentPrototype: Object): void;
    static getVisible(this: NajsEloquent.Model.IModel<any>): string[];
    static getHidden(this: NajsEloquent.Model.IModel<any>): string[];
    static markVisible(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static markHidden(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
    static isVisible(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isHidden(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static toObject(this: NajsEloquent.Model.IModel<any>, data: Object): Object;
    static toJSON(this: NajsEloquent.Model.IModel<any>): Object;
}
