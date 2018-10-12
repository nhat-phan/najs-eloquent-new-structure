import 'jest'
import { Model, HasMany, BelongsTo, Factory, factory } from '../../../lib'
import { register } from 'najs-binding'

class Post extends Model {
  user: BelongsTo<User>

  user_id: string
  title: string

  protected fillable: ['title']

  getClassName() {
    return 'Post'
  }

  get userRelation() {
    return this.defineRelation('user').belongsTo(User)
  }
}
register(Post)

class User extends Model {
  posts: HasMany<Post>

  getClassName() {
    return 'User'
  }

  get postsRelation() {
    return this.defineRelation('posts').hasMany(Post)
  }
}
register(User)

Factory.define(Post, (faker, attributes) => {
  return Object.assign({}, attributes, {
    title: faker.sentence()
  })
})

describe('HasMany Relationship', function() {
  it('should work as expected', async function() {
    const user = new User()

    user.postsRelation.associate(
      factory(Post, 3)
        .times(3)
        .make()
        .all()
    )
    await user.save()

    expect(user.posts).toBeUndefined()
    await user.load('posts')
    for (const post of user.posts!) {
      expect(post.user_id).toEqual(user.id)
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
  })

  describe('.associate()', function() {
    it('should work with new model', async function() {
      const user = new User()

      user.postsRelation.associate(
        factory(Post, 3)
          .times(3)
          .make()
          .all()
      )
      await user.save()

      const posts = await Post.where('user_id', user.id).get()
      for (const post of posts) {
        expect(post.user_id).toEqual(user.id)
      }
    })

    it('should work with existing model', async function() {
      const user = new User()
      await user.save()

      user.postsRelation.associate(
        factory(Post, 3)
          .times(3)
          .make()
          .all()
      )
      await user.save()

      const posts = await Post.where('user_id', user.id).get()
      for (const post of posts) {
        expect(post.user_id).toEqual(user.id)
      }
    })
  })
})
