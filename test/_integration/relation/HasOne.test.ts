import 'jest'
import { Model, HasOne } from '../../../lib'
import { register } from 'najs-binding'

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

    // const userLogin = new UserLogin()
    // userLogin.user_id = user.id
    // await userLogin.save()

    // const users = await User.newQuery().all()
    // console.log(users.first())
    console.log(user)
    console.log(user.id)
    // console.log(user)
    // console.log(userLogin)
  })
})
