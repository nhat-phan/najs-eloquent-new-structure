import 'jest'
import { Model, HasOne, BelongsTo } from '../../../lib'
import { register } from 'najs-binding'
// import collect from 'collect.js'

describe('HasOne Relation', function() {
  class UserLogin extends Model {
    user: BelongsTo<User>

    user_id: string

    getClassName() {
      return 'UserLogin'
    }

    get userRelation() {
      return this.defineRelation('user').belongsTo(User)
    }
  }
  register(UserLogin)

  class User extends Model {
    login: HasOne<UserLogin>

    getClassName() {
      return 'User'
    }

    get loginRelation() {
      return this.defineRelation('login').hasOne(UserLogin)
    }
  }
  register(User)

  it('should work with .hasOne()', async function() {
    const user = new User()
    await user.save()

    const userLogin = new UserLogin()
    userLogin.user_id = user.id
    await userLogin.save()

    const userResult = await User.newQuery().findOrFail(user.id)

    await userResult.loginRelation.load()
    expect(userResult.login!.toObject()).toEqual(userLogin.toObject())
  })

  it('should work with .belongsTo()', async function() {
    const user = new User()
    await user.save()

    const userLogin = new UserLogin()
    userLogin.user_id = user.id
    await userLogin.save()

    const loginResult = await UserLogin.newQuery().firstOrFail(userLogin.id)

    await loginResult.userRelation.load()
    expect(loginResult.user!.toObject()).toEqual(user.toObject())
  })

  it('test the collection pluck', function() {
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
  })
})
