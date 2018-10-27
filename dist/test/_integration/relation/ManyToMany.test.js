"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../../lib");
const najs_binding_1 = require("najs-binding");
class Role extends lib_1.Model {
    getClassName() {
        return 'Role';
    }
    get usersRelation() {
        return this.defineRelation('users')
            .belongsToMany(User, 'user_roles')
            .withPivot('active');
    }
}
najs_binding_1.register(Role);
class User extends lib_1.Model {
    getClassName() {
        return 'User';
    }
    get rolesRelation() {
        return this.defineRelation('roles')
            .belongsToMany(Role, 'user_roles')
            .withPivot('active');
    }
}
najs_binding_1.register(User);
lib_1.Factory.define(User, function (faker, attributes) {
    return Object.assign({}, {
        first_name: faker.first(),
        last_name: faker.last()
    }, attributes);
});
lib_1.Factory.define(Role, function (faker, attributes) {
    return Object.assign({}, {
        name: faker.word()
    }, attributes);
});
describe('ManyToManyRelationship', function () {
    it('should work', async function () {
        const user = lib_1.factory(User).make();
        const roleA = await lib_1.factory(Role).create({ name: 'a' });
        const roleB = await lib_1.factory(Role).create({ name: 'b' });
        await user.rolesRelation.attach(roleA.id, { active: true });
        await user.rolesRelation.attach(roleB.id, { active: false });
        await user.save();
        const pivotData = await user.rolesRelation
            .newPivotQuery()
            .where('user_id', user.id)
            .get();
        // console.log(pivotData.first()['internalData']['relationDataBucket'])
        expect(pivotData.pluck('user_id', 'role_id').all()).toEqual({
            [roleA.id]: user.id,
            [roleB.id]: user.id
        });
        const result = await User.findOrFail(user.id);
        expect(result.roles).toBeUndefined();
        await result.load('roles');
        expect(result.roles.pluck('id', 'id').all()).toEqual({
            [roleA.id]: roleA.id,
            [roleB.id]: roleB.id
        });
        const hash = {};
        for (const role of result.roles) {
            hash[role.pivot.role_id] = role.pivot.user_id;
        }
        expect(hash).toEqual({
            [roleA.id]: user.id,
            [roleB.id]: user.id
        });
    });
});
