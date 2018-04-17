"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Eloquent_1 = require("../../../lib/model/Eloquent");
const Serialization_1 = require("../../../lib/model/components/Serialization");
const ModelUtilities_1 = require("../../../lib/util/ModelUtilities");
const DummyDriver_1 = require("../../../lib/drivers/DummyDriver");
const EloquentDriverProviderFacade_1 = require("../../../lib/facades/global/EloquentDriverProviderFacade");
const EloquentComponentProviderFacade_1 = require("../../../lib/facades/global/EloquentComponentProviderFacade");
EloquentComponentProviderFacade_1.EloquentComponentProvider.register(Serialization_1.Serialization, 'serialization', true);
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(DummyDriver_1.DummyDriver, 'dummy', true);
describe('Model/Serialization', function () {
    describe('Unit', function () {
        describe('.getClassName()', function () {
            it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.Serialization" as class name', function () {
                const serialization = new Serialization_1.Serialization();
                expect(serialization.getClassName()).toEqual('NajsEloquent.Model.Component.Serialization');
            });
        });
        describe('.extend()', function () {
            it('extends the given prototype with 8 functions', function () {
                const functions = {
                    getVisible: 'getVisible',
                    getHidden: 'getHidden',
                    markVisible: 'markVisible',
                    markHidden: 'markHidden',
                    isVisible: 'isVisible',
                    isHidden: 'isHidden',
                    toObject: 'toObject',
                    toJSON: 'toJSON',
                    toJson: 'toJSON'
                };
                const prototype = {};
                const serialization = new Serialization_1.Serialization();
                serialization.extend(prototype, [], {});
                for (const name in functions) {
                    expect(typeof prototype[name] === 'function').toBe(true);
                    expect(prototype[name] === Serialization_1.Serialization[functions[name]]).toBe(true);
                }
            });
        });
        describe('static .isVisible()', function () {
            it('uses ModelUtilities.isInWhiteList() with whiteList = .getVisible(), blackList = this.getHidden()', function () {
                const isInWhiteListStub = Sinon.stub(ModelUtilities_1.ModelUtilities, 'isInWhiteList');
                isInWhiteListStub.returns('anything');
                const user = {
                    getVisible() {
                        return 'visible';
                    },
                    getHidden() {
                        return 'hidden';
                    }
                };
                expect(Serialization_1.Serialization.isVisible.call(user, 'test')).toEqual('anything');
                expect(isInWhiteListStub.calledWith(user, 'test', 'visible', 'hidden')).toBe(true);
                isInWhiteListStub.restore();
            });
        });
        describe('static .isGuarded()', function () {
            it('uses ModelUtilities.isInBlackList() with blackList = this.getHidden()', function () {
                const isInBlackListStub = Sinon.stub(ModelUtilities_1.ModelUtilities, 'isInBlackList');
                isInBlackListStub.returns('anything');
                const user = {
                    getHidden() {
                        return 'hidden';
                    }
                };
                expect(Serialization_1.Serialization.isHidden.call(user, 'test')).toEqual('anything');
                expect(isInBlackListStub.calledWith(user, 'test', 'hidden')).toBe(true);
                isInBlackListStub.restore();
            });
        });
    });
    describe('Integration', function () {
        class User extends Eloquent_1.Eloquent {
        }
        User.className = 'User';
        User.visible = ['first_name', 'last_name'];
        class Post extends Eloquent_1.Eloquent {
            constructor() {
                super(...arguments);
                this.visible = ['title', 'content'];
            }
        }
        Post.className = 'Post';
        class Token extends Eloquent_1.Eloquent {
        }
        Token.className = 'Token';
        Token.hidden = ['token'];
        class Secret extends Eloquent_1.Eloquent {
            constructor() {
                super(...arguments);
                this.hidden = ['password'];
            }
        }
        Secret.className = 'Secret';
        describe('.getVisible()', function () {
            it('works with both kind of settings - static or member', function () {
                const user = new User();
                expect(user.getVisible()).toEqual(['first_name', 'last_name']);
                const post = new Post();
                expect(post.getVisible()).toEqual(['title', 'content']);
            });
        });
        describe('.markVisible()', function () {
            it('is chainable.', function () {
                const user = new User();
                expect(user.markVisible('test') === user).toBe(true);
            });
            it('can use to apply a temporary setting', function () {
                const user = new User();
                user.markVisible('password');
                expect(user.getVisible()).toEqual(['first_name', 'last_name', 'password']);
                expect(user['visible']).toEqual(['password']);
                expect(new User().getVisible()).toEqual(['first_name', 'last_name']);
                const post = new Post();
                post.markVisible('view');
                expect(post.getVisible()).toEqual(['title', 'content', 'view']);
                expect(post['visible']).toEqual(['title', 'content', 'view']);
                expect(new Post().getVisible()).toEqual(['title', 'content']);
            });
        });
        describe('.getHidden()', function () {
            it('has default value is []', function () {
                const user = new User();
                expect(user.getHidden()).toEqual([]);
                const post = new Post();
                expect(post.getHidden()).toEqual([]);
            });
            it('works with both kind of settings - static or member', function () {
                const token = new Token();
                expect(token.getHidden()).toEqual(['token']);
                const secret = new Secret();
                expect(secret.getHidden()).toEqual(['password']);
            });
        });
        describe('.markHidden()', function () {
            it('is chainable.', function () {
                const user = new User();
                expect(user.markHidden('test') === user).toBe(true);
            });
            it('can use to apply a temporary setting', function () {
                const user = new User();
                user.markHidden('test');
                expect(user.getHidden()).toEqual(['test']);
                expect(new User().getHidden()).toEqual([]);
                const post = new Post();
                post.markHidden('test');
                expect(post.getHidden()).toEqual(['test']);
                expect(new Post().getHidden()).toEqual([]);
                const token = new Token();
                token.markHidden('test');
                expect(token.getHidden()).toEqual(['token', 'test']);
                expect(token['hidden']).toEqual(['test']);
                expect(new Token().getHidden()).toEqual(['token']);
                const secret = new Secret();
                secret.markHidden('test');
                expect(secret.getHidden()).toEqual(['password', 'test']);
                expect(secret['hidden']).toEqual(['password', 'test']);
                expect(new Secret().getHidden()).toEqual(['password']);
            });
        });
        describe('.toObject()', function () {
            it('calls "driver".toObject()', function () {
                const user = new User();
                const driverToObjectStub = Sinon.stub(user['driver'], 'toObject');
                driverToObjectStub.returns('anything');
                expect(user.toObject()).toEqual('anything');
                expect(driverToObjectStub.called).toBe(true);
            });
        });
        describe('.toJSON()', function () {
            it('calls .toObject() and filters the key which allowed to visible in JSON', function () {
                const token = new Token();
                token.forceFill({ a: 1, b: 2, token: 'hidden' });
                expect(token.toObject()).toEqual({ a: 1, b: 2, token: 'hidden' });
                expect(token.toJSON()).toEqual({ a: 1, b: 2 });
                token.markHidden('b');
                expect(token.toJSON()).toEqual({ a: 1 });
            });
        });
    });
});
