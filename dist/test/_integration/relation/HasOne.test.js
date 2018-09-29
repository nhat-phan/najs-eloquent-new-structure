"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../../lib");
const najs_binding_1 = require("najs-binding");
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
        // const users = await User.newQuery().all()
        // console.log(users.first())
        // console.log(user)
        // console.log(user.id)
        // console.log(userLogin.user_id)
    });
});
