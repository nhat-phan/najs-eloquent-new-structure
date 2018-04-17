/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class DynamicAttribute implements Najs.Contracts.Eloquent.Component {
    getClassName(): string;
    extend(prototype: Object, eloquentPrototype: Object): void;
    static hasAttribute(this: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static buildKnownAttributes(model: NajsEloquent.Model.IModel<any>): void;
}
