"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../../lib");
const najs_binding_1 = require("najs-binding");
// import collect from 'collect.js'
describe('HasOne Relation', function () {
    class UserLogin extends lib_1.Model {
        getClassName() {
            return 'UserLogin';
        }
        get userRelation() {
            return this.defineRelation('user').belongsTo(User);
        }
    }
    najs_binding_1.register(UserLogin);
    class User extends lib_1.Model {
        getClassName() {
            return 'User';
        }
        get loginRelation() {
            return this.defineRelation('login').hasOne(UserLogin);
        }
    }
    najs_binding_1.register(User);
    it('should work with .hasOne()', async function () {
        const user = new User();
        await user.save();
        const userLogin = new UserLogin();
        userLogin.user_id = user.id;
        await userLogin.save();
        const userResult = await User.newQuery().findOrFail(user.id);
        await userResult.loginRelation.load();
        expect(userResult.login.toObject()).toEqual(userLogin.toObject());
    });
    it('should work with .belongsTo()', async function () {
        const user = new User();
        await user.save();
        const userLogin = new UserLogin();
        userLogin.user_id = user.id;
        await userLogin.save();
        const loginResult = await UserLogin.newQuery().firstOrFail(userLogin.id);
        await loginResult.userRelation.load();
        expect(loginResult.user.toObject()).toEqual(user.toObject());
    });
    it('test the collection pluck', function () {
        // const data = {
        //   1: { a: 1, b: '2', c: '3' },
        //   2: { a: 2, b: '3', c: '4' },
        //   3: { a: 3, b: '4', c: '5' }
        // }
        // console.log(
        //   collect(data)
        //     .keyBy('b')
        //     .keys()
        //     .all()
        // )
    });
});
