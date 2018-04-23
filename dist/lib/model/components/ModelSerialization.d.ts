/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class ModelSerialization implements Najs.Contracts.Eloquent.Component {
    static className: string;
    getClassName(): string;
    extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    static getVisible: NajsEloquent.Model.ModelMethod<string[]>;
    static getHidden: NajsEloquent.Model.ModelMethod<string[]>;
    static markVisible: NajsEloquent.Model.ModelMethod<string[], any>;
    static markHidden: NajsEloquent.Model.ModelMethod<string[], any>;
    static isVisible(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isHidden(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static toObject(this: NajsEloquent.Model.IModel<any>, data: Object): Object;
    static toJSON(this: NajsEloquent.Model.IModel<any>): Object;
}
