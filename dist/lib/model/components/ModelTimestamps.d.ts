/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class ModelTimestamps implements Najs.Contracts.Eloquent.Component {
    static className: string;
    getClassName(): string;
    extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    static hasTimestamps(this: NajsEloquent.Model.IModel<any>): boolean;
    static getTimestampsSetting(this: NajsEloquent.Model.IModel<any>): void;
    static touch(this: NajsEloquent.Model.IModel<any>): NajsEloquent.Model.IModel<any>;
}
