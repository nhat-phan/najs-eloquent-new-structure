import 'jest'
import { Model, MorphMany, MorphTo } from '../../../lib'

class Image extends Model {
  imageable: MorphTo<Model>
  imageable_type: string
  imageable_id: string
  url: string

  protected fillable = ['imageable_type', 'imageable_id', 'url']

  getClassName() {
    return 'Image'
  }

  get imageableRelation() {
    return this.defineRelation('imageable').morphTo()
  }
}
Model.register(Image)

class User extends Model {
  images: MorphMany<Image>

  getClassName() {
    return 'User'
  }

  get imagesRelation() {
    return this.defineRelation('images').morphMany(Image, 'imageable')
  }
}
Model.register(User)

class Post extends Model {
  images: MorphMany<Image>

  getClassName() {
    return 'Post'
  }

  get imagesRelation() {
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

    const result = await User.with('images').findOrFail(user.id)
    expect(result.images!.map(item => item.attributesToObject()).all()).toEqual([
      userImage1.attributesToObject(),
      userImage2.attributesToObject()
    ])
    expect(result.isLoaded('images')).toBe(true)

    expect(user.images).toBeUndefined()
    expect(user.isLoaded('images')).toBe(false)
    await user.load('images')
    expect(user.images!.map(item => item.attributesToObject()).all()).toEqual([
      userImage1.attributesToObject(),
      userImage2.attributesToObject()
    ])
    expect(user.isLoaded('images')).toBe(true)

    expect(userImage1.imageable).toBeUndefined()
    expect(userImage1.isLoaded('imageable')).toBe(false)
    await userImage1.load('imageable')
    expect(userImage1.imageable!.id).toEqual(user.id)
    expect(userImage1.isLoaded('imageable')).toBe(true)

    expect(postImage.imageable).toBeUndefined()
    expect(postImage.isLoaded('imageable')).toBe(false)
    await postImage.load('imageable')
    expect(postImage.imageable!.id).toEqual(post.id)
    expect(postImage.isLoaded('imageable')).toBe(true)

    const images = await Image.with('imageable').get()
    for (const image of images) {
      expect(image.imageable).toBeInstanceOf(Model)
    }
  })

  describe('.associate()', function() {
    it('should work with not saved model', async function() {
      const user = new User()
      const image1 = new Image()
      const image2 = new Image()
      user.imagesRelation.associate(image1, image2)

      await user.save()
      await user.load('images')
      expect(user.toObject()).toEqual({
        id: user.id,
        images: [
          {
            imageable_id: user.id,
            imageable_type: user.getModelName(),
            id: image1.id
          },
          {
            imageable_id: user.id,
            imageable_type: user.getModelName(),
            id: image2.id
          }
        ]
      })
    })

    it('should work with saved model', async function() {
      const user = new User()
      await user.save()

      const image1 = new Image()
      await image1.save()

      const image2 = new Image()
      await image2.save()

      user.imagesRelation.associate(image1, image2)

      await user.save()
      await user.load('images')
      expect(user.toObject()).toEqual({
        id: user.id,
        images: [
          {
            imageable_id: user.id,
            imageable_type: user.getModelName(),
            id: image1.id
          },
          {
            imageable_id: user.id,
            imageable_type: user.getModelName(),
            id: image2.id
          }
        ]
      })
    })
  })
})
