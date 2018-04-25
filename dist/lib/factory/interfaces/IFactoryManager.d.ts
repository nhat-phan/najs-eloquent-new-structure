import { IFactoryBuilder } from './IFactoryBuilder';
import { Eloquent } from '../../model/Eloquent';
export interface ModelClass<T> {
    new (): T;
}
export interface IFactoryDefinition<Faker> {
    (faker: Faker, attributes?: Object): Object;
}
export interface IFactoryManager<Faker> {
    define(className: string | ModelClass<Eloquent>, definition: IFactoryDefinition<Faker>): this;
    defineAs(className: string | ModelClass<Eloquent>, name: string, definition: IFactoryDefinition<Faker>): this;
    state(className: string | ModelClass<Eloquent>, state: string, definition: IFactoryDefinition<Faker>): this;
    of<T>(className: string | ModelClass<T>): IFactoryBuilder<T>;
    of<T>(className: string | ModelClass<T>, name: string): IFactoryBuilder<T>;
    create<T = any>(className: string | ModelClass<T>): Promise<T>;
    create<T = any>(className: string | ModelClass<T>, attributes: Object): Promise<T>;
    createAs<T = any>(className: string | ModelClass<T>, name: string): Promise<T>;
    createAs<T = any>(className: string | ModelClass<T>, name: string, attributes: Object): Promise<T>;
    make<T = any>(className: string | ModelClass<T>): T;
    make<T = any>(className: string | ModelClass<T>, attributes: Object): T;
    makeAs<T = any>(className: string | ModelClass<T>, name: string): T;
    makeAs<T = any>(className: string | ModelClass<T>, name: string, attributes: Object): T;
    raw<T = any>(className: string | ModelClass<T>): T;
    raw<T = any>(className: string | ModelClass<T>, attributes: Object): T;
    rawOf<T = any>(className: string | ModelClass<T>, name: string): T;
    rawOf<T = any>(className: string | ModelClass<T>, name: string, attributes: Object): T;
}
