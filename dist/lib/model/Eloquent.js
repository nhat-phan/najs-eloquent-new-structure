"use strict";
/// <reference path="../definitions/model/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class Eloquent extends Model_1.Model {
    static Class() {
        return this;
    }
}
exports.Eloquent = Eloquent;
// class User extends Eloquent.Class<User>() {
//   name: string
// }
// async function test() {
//   const result = await User.firstOrFail('test')
//   result.name
// }
