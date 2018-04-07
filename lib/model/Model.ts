/// <reference path="./interfaces/IModel.d.ts" />

export interface IModelQuery<A> {
  first(): Najs.Database.IModel<A> & A
}

export interface IEloquent<A> {
  new (): Najs.Database.IModel<A> & IModelQuery<A> & A
}

export const Model: IEloquent<any> = <any>function<A>() {
  return {}
}

export interface IUser {
  email: string
}

export interface IUserMethods {
  getSomething(...args: any[]): any
}

export class User extends (Model as IEloquent<IUser & IUserMethods>) {
  getSomething(...args: any[]) {
    this.email = 'test'
  }
}
const user = new User()
user.getSomething(user.email)
user.first().email = 'test'
user.first().getSomething()
user.first().getFillable()
