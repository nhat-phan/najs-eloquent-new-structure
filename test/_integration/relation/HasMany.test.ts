import 'jest'
import { Model, HasMany, BelongsTo, Factory, factory } from '../../../lib'

class Post extends Model {
  user: BelongsTo<User>
  comments: HasMany<Comment>

  user_id: string
  title: string

  protected fillable: ['title']

  getClassName() {
    return 'Post'
  }

  get userRelation() {
    return this.defineRelation('user').belongsTo(User)
  }

  get commentsRelation() {
    return this.defineRelation('comments').hasMany(Comment)
  }
}
Model.register(Post)

class User extends Model {
  posts: HasMany<Post>

  getClassName() {
    return 'User'
  }

  get postsRelation() {
    return this.defineRelation('posts').hasMany(Post)
  }
}
Model.register(User)

class Comment extends Model {
  post: BelongsTo<Post>
  user: BelongsTo<User>

  post_id: string
  user_id: string
  content: string

  getClassName() {
    return 'Comment'
  }

  get postRelation() {
    return this.defineRelation('post').hasOne(Post)
  }

  get userRelation() {
    return this.defineRelation('user').hasOne(User)
  }
}
Model.register(Comment)

Factory.define(User, (faker, attributes) => {
  return Object.assign({}, attributes, {})
})

Factory.define(Post, (faker, attributes) => {
  return Object.assign({}, attributes, {
    title: faker.sentence()
  })
})

Factory.define(Comment, (faker, attributes) => {
  return Object.assign({}, attributes, {
    content: faker.paragraph()
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

  it('could be loaded via chain', async function() {
    const user = await factory(User).create()
    const post = await factory(Post).create({ user_id: user.id })
    user.postsRelation.associate(
      post,
      factory(Post, 3)
        .times(3)
        .make()
        .all()
    )
    await user.save()

    post.commentsRelation.associate(
      factory(Comment, 2)
        .times(2)
        .make()
        .all()
    )
    await post.save()

    const firstUser = await User.findOrFail(user.id)
    await firstUser.load('posts.comments')

    const firstPost = firstUser.posts!.first()
    expect(firstPost.comments!.count()).toEqual(2)
    expect(firstPost.comments!.map(item => item.post_id).all()).toEqual([firstPost.id, firstPost.id])
    expect(firstPost.comments!.map(item => item.id).all()).toEqual(
      (await Comment.where('post_id', firstPost.id).get()).map(item => item.id).all()
    )
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
