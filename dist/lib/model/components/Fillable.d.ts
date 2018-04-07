/// <reference path="../../contracts/ModelComponent.d.ts" />
export declare class Fillable implements Najs.Contracts.Eloquent.ModelComponent {
    getClassName(): string;
    isGetter(key: string | symbol, model: any): boolean;
    proxifyGetter(model: any, key: string | symbol): any;
    isSetter(key: string | symbol, value: any, model: any): any;
    proxifySetter(model: any, key: string | symbol, value: any): boolean;
}
