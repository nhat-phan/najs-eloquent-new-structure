import { RecordManagerBase } from './RecordManagerBase';
import { Record } from './Record';
export declare class RecordManager<T extends Record> extends RecordManagerBase<T> {
    getClassName(): string;
    initialize(model: NajsEloquent.Model.IModel<Record>, isGuarded: boolean, data?: T | object): void;
    getAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): any;
    setAttribute<T>(model: NajsEloquent.Model.IModel<Record>, key: string, value: T): boolean;
    hasAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): boolean;
    getPrimaryKeyName(model: NajsEloquent.Model.IModel): string;
    toObject(model: NajsEloquent.Model.IModel<T>): object;
    markModified(model: NajsEloquent.Model.IModel<T>, keys: ArrayLike<Array<string | string[]>>): void;
    isModified(model: NajsEloquent.Model.IModel<T>, keys: ArrayLike<Array<string | string[]>>): boolean;
    getModified(model: NajsEloquent.Model.IModel<T>): string[];
}
