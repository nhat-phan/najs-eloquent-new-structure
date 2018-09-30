import 'jest'
import { Model, HasOne } from '../../../lib'
import { register } from 'najs-binding'
// import collect from 'collect.js'

describe('HasOne Relation', function() {
  class UserLogin extends Model {
    user_id: string

    getClassName() {
      return 'UserLogin'
    }
  }
  register(UserLogin)

  class User extends Model {
    login: HasOne<UserLogin>

    getClassName() {
      return 'User'
    }

    get loginRelation() {
      return this.defineRelationAccessor('login').hasOne(UserLogin)
    }
  }
  register(User)

  it('should work', async function() {
    const user = new User()
    await user.save()

    const userLogin = new UserLogin()
    userLogin.user_id = user.id
    await userLogin.save()

    // const users = await User.newQuery().all()
    // console.log(users.first())
    // console.log(user)
    // console.log(user.id)
    // console.log(userLogin.user_id)
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
