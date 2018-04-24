/// <reference path="../../contracts/Component.d.ts" />
/// <reference path="../interfaces/IModel.d.ts" />
export declare class ModelSoftDeletes implements Najs.Contracts.Eloquent.Component {
    static className: string;
    getClassName(): string;
    extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    static hasSoftDeletes: NajsEloquent.Model.ModelMethod<boolean>;
    static getSoftDeletesSetting: NajsEloquent.Model.ModelMethod<NajsEloquent.Model.ISoftDeletesSetting>;
    static readonly DefaultSetting: NajsEloquent.Model.ISoftDeletesSetting;
}
