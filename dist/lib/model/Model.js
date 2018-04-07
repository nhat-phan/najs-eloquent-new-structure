"use strict";
/// <reference path="./interfaces/IModel.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = function () {
    return {};
};
class User extends exports.Model {
    getSomething(...args) {
        this.email = 'test';
    }
}
exports.User = User;
const user = new User();
user.getSomething(user.email);
user.first().email = 'test';
user.first().getSomething();
user.first().getFillable();
