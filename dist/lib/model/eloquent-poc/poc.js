"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Model } from '../Model'
// export type Diff<T, U> = T extends U ? never : T
// export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// // type RawModel<T> = Omit<Eloquent, 'limit'>
// export interface ModelQuery<T extends Model> {
//   limit(): IQueryBuilder<T>
// }
// export interface Eloquent {
//   // limit(): IQueryBuilder<Omit<this, keyof IQueryBuilder<any>>>
//   // where(): IQueryBuilder<Omit<this, keyof IQueryBuilder<any>>>
//   // limit(): Omit<this, 'limit'>
// }
// export class Eloquent extends Model {}
// export interface User extends ModelQuery<User> {}
// export class User extends Model {
//   email: string
// }
// export class Post extends Eloquent {
//   email: string
// }
// export class OmitModel {
//   limit(): Omit<this, 'omitted'> {
//     return this
//   }
//   omitted(): string {
//     return ''
//   }
// }
// // const omitModel = new OmitModel()
// export async function test_user_querying_by_newQuery() {
//   const userModel = new User()
//   const result = await userModel.newQuery().firstOrFail('id')
//   console.log(result.email)
//   const result2 = await userModel
//     .newQuery()
//     .queryName('test')
//     .firstOrFail('id')
//   console.log(result2.email)
// }
// export async function test_user_querying_by_queryBuilderFunctions() {
//   const userModel = new User()
//   const result = await userModel.limit().firstOrFail('id')
//   console.log(result.email)
//   // console.log(result.limit())
//   // result.
// }
// export async function test_post_querying_by_newQuery() {
//   const userModel = new User()
//   // const result = await userModel.newQuery().firstOrFail('id')
//   // console.log(result.limit())
// }
// export async function test_post_querying_by_queryBuilderFunctions() {
//   const userModel = new Post()
//   const result = await userModel.limit().findOrFail('id')
//   console.log(result.where())
//   console.log(result.limit())
// }
class Foo {
    static where() {
        return new this();
    }
}
class Bar extends Foo {
}
async function test_static_query() {
    const test = await Bar.where().findOrFail('id');
    console.log(test.bar);
}
exports.test_static_query = test_static_query;
