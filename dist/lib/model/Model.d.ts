/// <reference path="../../../lib/model/interfaces/IModel.d.ts" />
export interface IModelQuery<A> {
    first(): Najs.Eloquent.IModel<A> & A;
}
export interface IEloquent<A> {
    new (): Najs.Eloquent.IModel<A> & IModelQuery<A> & A;
}
export declare const Model: IEloquent<any>;
export interface IUser {
    email: string;
}
export interface IUserMethods {
    getSomething(...args: any[]): any;
}
declare const User_base: IEloquent<IUser & IUserMethods>;
export declare class User extends User_base {
    getSomething(...args: any[]): void;
}
