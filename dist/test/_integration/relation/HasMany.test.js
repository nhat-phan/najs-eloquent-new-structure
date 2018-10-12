"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../../lib");
const najs_binding_1 = require("najs-binding");
class Post extends lib_1.Model {
    getClassName() {
        return 'Post';
    }
    get userRelation() {
        return this.defineRelation('user').belongsTo(User);
    }
}
najs_binding_1.register(Post);
class User extends lib_1.Model {
    getClassName() {
        return 'User';
    }
    get postsRelation() {
        return this.defineRelation('posts').hasMany(Post);
    }
}
najs_binding_1.register(User);
lib_1.Factory.define(Post, (faker, attributes) => {
    return Object.assign({}, attributes, {
        title: faker.sentence()
    });
});
describe('HasMany Relationship', function () {
    it('should work as expected', async function () {
        const user = new User();
        user.postsRelation.associate(lib_1.factory(Post, 3)
            .times(3)
            .make()
            .all());
        await user.save();
        expect(user.posts).toBeUndefined();
        await user.load('posts');
        for (const post of user.posts) {
            expect(post.user_id).toEqual(user.id);
        }
        // const posts = await Post.where('user_id', user.id).get()
        // console.log(posts.map(item => item.toJson()))
        // const userResult = await User.findOrFail(user.id)
        // QueryLog.disable()
        // console.log(userResult.posts)
        // await userResult.postsRelation.load()
        // console.log(userResult.posts)
        // for (const log of QueryLog.pull()) {
        //   console.log(log)
        // }
    });
    describe('.associate()', function () {
        it('should work with new model', async function () {
            const user = new User();
            user.postsRelation.associate(lib_1.factory(Post, 3)
                .times(3)
                .make()
                .all());
            await user.save();
            const posts = await Post.where('user_id', user.id).get();
            for (const post of posts) {
                expect(post.user_id).toEqual(user.id);
            }
        });
        it('should work with existing model', async function () {
            const user = new User();
            await user.save();
            user.postsRelation.associate(lib_1.factory(Post, 3)
                .times(3)
                .make()
                .all());
            await user.save();
            const posts = await Post.where('user_id', user.id).get();
            for (const post of posts) {
                expect(post.user_id).toEqual(user.id);
            }
        });
    });
});
