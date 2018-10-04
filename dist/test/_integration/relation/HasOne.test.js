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
    }
    najs_binding_1.register(UserLogin);
    class User extends lib_1.Model {
        getClassName() {
            return 'User';
        }
        get loginRelation() {
            return this.defineRelationAccessor('login').hasOne(UserLogin);
        }
    }
    najs_binding_1.register(User);
    it('should work', async function () {
        const user = new User();
        await user.save();
        const userLogin = new UserLogin();
        userLogin.user_id = user.id;
        await userLogin.save();
        // console.log('data', userLogin.toObject())
        const result = await User.newQuery().findOrFail(user.id);
        // console.log('before loading', result.login)
        // console.log('data before loading', result['internalData']['relations']['login'])
        await result.loginRelation.load();
        // console.log('data after loading', result['internalData']['relations']['login'])
        // console.log('after loading', result.login!.toObject())
        // console.log('data after using', result['internalData']['relations']['login'])
        expect(result.login.toObject()).toEqual(userLogin.toObject());
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
