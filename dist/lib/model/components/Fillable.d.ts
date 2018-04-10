/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class Fillable implements Najs.Contracts.Eloquent.Component {
    model: NajsEloquent.Model.IModel<any>;
    driver: Najs.Contracts.Eloquent.Driver<any>;
    "constructor"(model: NajsEloquent.Model.IModel<any>, driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getClassName(): string;
    isGetter(key: string | symbol, model: NajsEloquent.Model.IModel<any>): boolean;
    proxifyGetter(model: NajsEloquent.Model.IModel<any>, key: string | symbol): any;
    isSetter(key: string | symbol, value: any, model: NajsEloquent.Model.IModel<any>): any;
    proxifySetter(model: NajsEloquent.Model.IModel<any>, key: string | symbol, value: any): boolean;
    getFillable(this: NajsEloquent.Model.IModel<any>): string[];
}
