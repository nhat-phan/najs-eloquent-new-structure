/// <reference path="../contracts/Driver.d.ts" />
/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/IRecordManager.d.ts" />
/**
 * Base class of all RecordManager, handling:
 *   - getKnownAttributes() and getDynamicAttributes() accessors
 *   - finding accessors/mutators and getters/setters of model
 */
export declare abstract class RecordManagerBase<T> implements NajsEloquent.Feature.IRecordManager<T> {
    abstract initialize(model: NajsEloquent.Model.IModel, isGuarded: boolean, data?: T | object): void;
    abstract getAttribute(model: NajsEloquent.Model.IModel, key: string): any;
    abstract setAttribute<T>(model: NajsEloquent.Model.IModel, key: string, value: T): boolean;
    abstract hasAttribute(model: NajsEloquent.Model.IModel, key: string): boolean;
    abstract getPrimaryKeyName(model: NajsEloquent.Model.IModel): string;
    abstract getClassName(): string;
    getFeatureName(): string;
    getRecordName(model: NajsEloquent.Model.IModel): string;
    getRecord(model: NajsEloquent.Model.IModel): T;
    formatAttributeName(model: NajsEloquent.Model.IModel, name: string): string;
    getPrimaryKey(model: NajsEloquent.Model.IModel): any;
    setPrimaryKey<K>(model: NajsEloquent.Model.IModel, value: K): boolean;
    getKnownAttributes(model: NajsEloquent.Model.IModel): string[];
    getDynamicAttributes(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.DynamicAttributeSetting[];
    attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    buildKnownAttributes(prototype: object, bases: object[]): string[];
    buildDynamicAttributes(prototype: Object, bases: Object[]): {};
    findGettersAndSetters(dynamicAttributes: Object, prototype: Object): void;
    createDynamicAttributeIfNeeded(bucket: Object, property: string): void;
    findAccessorsAndMutators(bucket: Object, prototype: any): void;
    bindAccessorsAndMutators(prototype: Object, dynamicAttributes: Object): void;
    makeAccessorAndMutatorDescriptor(prototype: Object, name: string, settings: NajsEloquent.Feature.DynamicAttributeSetting): Object | undefined;
}
