import 'jest'
import { Model, HasOne, BelongsTo } from '../../../lib'
import { register } from 'najs-binding'
// import collect from 'collect.js'

describe('HasOne Relation', function() {
  class LoginToken extends Model {
    user: BelongsTo<User>

    user_id: string

    getClassName() {
      return 'LoginToken'
    }

    get userRelation() {
      return this.defineRelation('user').belongsTo(User)
    }
  }
  register(LoginToken)

  class User extends Model {
    login: HasOne<LoginToken>

    getClassName() {
      return 'User'
    }

    get loginRelation() {
      return this.defineRelation('login').hasOne(LoginToken)
    }
  }
  register(User)

  describe('HasOne', function() {
    it('should work as expected', async function() {
      const user = new User()
      await user.save()

      const login = new LoginToken()
      login.user_id = user.id
      await login.save()

      const userResult = await User.newQuery().findOrFail(user.id)

      await userResult.loginRelation.load()
      expect(userResult.login!.toObject()).toEqual(login.toObject())
    })

    describe('.associate()', function() {
      it('should work if the user is not saved yet', async function() {
        const user = new User()

        const login = new LoginToken()
        user.loginRelation.associate(login)

        expect(user.id).toBeUndefined()
        expect(login.id).toBeUndefined()
        await user.save()

        expect(user.id).not.toBeUndefined()
        expect(login.user_id).toEqual(user.id)
        expect(login.id).not.toBeUndefined()
      })

      it('should work if the user which already saved.', async function() {
        const user = new User()
        await user.save()

        const login = new LoginToken()

        expect(user.getPrimaryKey()).not.toBeUndefined()
        user.loginRelation.associate(login)

        expect(login.id).toBeUndefined()
        expect(login.user_id === user.id).toBe(true)

        // it should be called save again, otherwise the association is not saved.
        await user.save()

        expect(login.id).not.toBeUndefined()
        expect(login.user_id === user.id).toBe(true)
      })
    })
  })

  describe('BelongsTo', function() {
    it('should work with .belongsTo()', async function() {
      const user = new User()
      await user.save()

      const userLogin = new LoginToken()
      userLogin.user_id = user.id
      await userLogin.save()

      const loginResult = await LoginToken.newQuery().firstOrFail(userLogin.id)

      await loginResult.userRelation.load()
      expect(loginResult.user!.toObject()).toEqual(user.toObject())
    })
  })

  // it('test the collection pluck', function() {
  //   // const data = {
  //   //   1: { a: 1, b: '2', c: '3' },
  //   //   2: { a: 2, b: '3', c: '4' },
  //   //   3: { a: 3, b: '4', c: '5' }
  //   // }
  //   // console.log(
  //   //   collect(data)
  //   //     .keyBy('b')
  //   //     .keys()
  //   //     .all()
  //   // )
  // })
})
