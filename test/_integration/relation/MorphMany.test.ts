import 'jest'
import { Model, MorphMany } from '../../../lib'

class Image extends Model {
  imageable_type: string
  imageable_id: string
  url: string

  protected fillable = ['imageable_type', 'imageable_id', 'url']

  getClassName() {
    return 'Image'
  }
}
Model.register(Image)

class User extends Model {
  images: MorphMany<Image>

  getClassName() {
    return 'User'
  }

  get imageRelation() {
    return this.defineRelation('images').morphMany(Image, 'imageable')
  }
}
Model.register(User)

class Post extends Model {
  images: MorphMany<Image>

  getClassName() {
    return 'Post'
  }

  get imageRelation() {
    return this.defineRelation('images').morphMany(Image, 'imageable')
  }
}
Model.register(Post)

describe('MorphMany', function() {
  it('should work as expected', async function() {
    const user = new User()
    await user.save()

    const post = new Post()
    await post.save()

    const userImage1 = new Image({
      imageable_type: 'User',
      imageable_id: user.id,
      url: 'image for user'
    })
    await userImage1.save()

    const userImage2 = new Image({
      imageable_type: 'User',
      imageable_id: user.id,
      url: 'image for user'
    })
    await userImage2.save()

    const postImage = new Image({
      imageable_type: 'Post',
      imageable_id: post.id,
      url: 'image for post'
    })
    await postImage.save()

    const result = await User.findOrFail(user.id)

    expect(user.images).toBeUndefined()
    await user.load('images')
    expect(user.images!.map(item => item.toJson()).all()).toEqual([userImage1.toJson(), userImage2.toJson()])

    expect(result.images).toBeUndefined()
    await result.load('images')
    expect(user.images!.map(item => item.toJson()).all()).toEqual([userImage1.toJson(), userImage2.toJson()])
  })
})
