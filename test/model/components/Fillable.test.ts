import 'jest'
import * as Sinon from 'sinon'
import { Eloquent } from '../../../lib/model/Eloquent'
import { Attribute } from '../../../lib/model/components/Attribute'
import { Fillable } from '../../../lib/model/components/Fillable'
import { ModelUtilities } from '../../../lib/util/ModelUtilities'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { EloquentDriverProvider } from '../../../lib/facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../../../lib/facades/global/EloquentComponentProviderFacade'

EloquentComponentProvider.register(Attribute, 'attribute', true)
EloquentComponentProvider.register(Fillable, 'fillable', true)
EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model/Fillable', function() {
  describe('Unit', function() {
    describe('.getClassName()', function() {
      it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.Fillable" as class name', function() {
        const fillable = new Fillable()
        expect(fillable.getClassName()).toEqual('NajsEloquent.Model.Component.Fillable')
      })
    })

    describe('.extend()', function() {
      it('extends the given prototype with 8 functions', function() {
        const functions = [
          'getFillable',
          'getGuarded',
          'markFillable',
          'markGuarded',
          'isFillable',
          'isGuarded',
          'fill',
          'forceFill'
        ]
        const prototype = {}
        const fillable = new Fillable()
        fillable.extend(prototype)
        for (const name in functions) {
          expect(prototype[name] === Fillable[name]).toBe(true)
        }
      })
    })

    describe('static .isFillable()', function() {
      it('uses ModelUtilities.isInWhiteList() with whiteList = .getFillable(), blackList = this.getGuarded()', function() {
        const isInWhiteListStub = Sinon.stub(ModelUtilities, 'isInWhiteList')
        isInWhiteListStub.returns('anything')

        const user = {
          getFillable() {
            return 'fillable'
          },
          getGuarded() {
            return 'guarded'
          }
        }

        expect(Fillable.isFillable.call(user, 'test')).toEqual('anything')
        expect(isInWhiteListStub.calledWith(user, 'test', 'fillable', 'guarded')).toBe(true)
        isInWhiteListStub.restore()
      })
    })

    describe('static .isGuarded()', function() {
      it('uses ModelUtilities.isInBlackList() with blackList = this.getGuarded()', function() {
        const isInBlackListStub = Sinon.stub(ModelUtilities, 'isInBlackList')
        isInBlackListStub.returns('anything')

        const user = {
          getGuarded() {
            return 'guarded'
          }
        }

        expect(Fillable.isGuarded.call(user, 'test')).toEqual('anything')
        expect(isInBlackListStub.calledWith(user, 'test', 'guarded')).toBe(true)
        isInBlackListStub.restore()
      })
    })
  })

  describe('Integration', function() {
    class User extends Eloquent {
      static className = 'User'
      static fillable = ['first_name', 'last_name']
    }

    class Post extends Eloquent {
      static className = 'Post'
      fillable = ['title', 'content']
    }

    class Token extends Eloquent {
      static className = 'Token'
      static guarded = ['token']
    }

    class Secret extends Eloquent {
      static className = 'Secret'
      guarded = ['password']
    }

    describe('.getFillable()', function() {
      it('works with both kind of settings - static or member', function() {
        const user = new User()
        expect(user.getFillable()).toEqual(['first_name', 'last_name'])

        const post = new Post()
        expect(post.getFillable()).toEqual(['title', 'content'])
      })
    })

    describe('.markFillable()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.markFillable('test') === user).toBe(true)
      })

      it('can use to apply a temporary setting', function() {
        const user = new User()
        user.markFillable('password')
        expect(user.getFillable()).toEqual(['first_name', 'last_name', 'password'])
        expect(user['fillable']).toEqual(['password'])
        expect(new User().getFillable()).toEqual(['first_name', 'last_name'])

        const post = new Post()
        post.markFillable('view')
        expect(post.getFillable()).toEqual(['title', 'content', 'view'])
        expect(post['fillable']).toEqual(['title', 'content', 'view'])
        expect(new Post().getFillable()).toEqual(['title', 'content'])
      })
    })

    describe('.getGuarded()', function() {
      it('has default value is ["*"]', function() {
        const user = new User()
        expect(user.getGuarded()).toEqual(['*'])

        const post = new Post()
        expect(post.getGuarded()).toEqual(['*'])
      })

      it('works with both kind of settings - static or member', function() {
        const token = new Token()
        expect(token.getGuarded()).toEqual(['token'])

        const secret = new Secret()
        expect(secret.getGuarded()).toEqual(['password'])
      })
    })

    describe('.markGuarded()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.markGuarded('test') === user).toBe(true)
      })

      it('can use to apply a temporary setting', function() {
        const user = new User()
        user.markGuarded('test')
        expect(user.getGuarded()).toEqual(['test'])
        expect(new User().getGuarded()).toEqual(['*'])

        const post = new Post()
        post.markGuarded('test')
        expect(post.getGuarded()).toEqual(['test'])
        expect(new Post().getGuarded()).toEqual(['*'])

        const token = new Token()
        token.markGuarded('test')
        expect(token.getGuarded()).toEqual(['token', 'test'])
        expect(token['guarded']).toEqual(['test'])
        expect(new Token().getGuarded()).toEqual(['token'])

        const secret = new Secret()
        secret.markGuarded('test')
        expect(secret.getGuarded()).toEqual(['password', 'test'])
        expect(secret['guarded']).toEqual(['password', 'test'])
        expect(new Secret().getGuarded()).toEqual(['password'])
      })
    })

    describe('.fill()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.fill({}) === user).toBe(true)
      })

      it('fills the model with an array of attributes', function() {
        const userOne = new User()
        userOne.fill({ first_name: 'a', last_name: 'b', password: 'c' })
        expect(userOne['attributes']).toEqual({ first_name: 'a', last_name: 'b' })

        const userTwo = new User()
        userTwo.markFillable('password').fill({ first_name: 'a', last_name: 'b', password: 'c' })
        expect(userTwo['attributes']).toEqual({ first_name: 'a', last_name: 'b', password: 'c' })

        const token = new Token()
        token.fill({ token: 'a', b: 'b', c: 'c' })
        expect(token['attributes']).toEqual({ b: 'b', c: 'c' })
      })
    })

    describe('.forceFill()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.forceFill({}) === user).toBe(true)
      })

      it('fills the model with an array of attributes, force mass assignment', function() {
        const user = new User()
        user.markGuarded('a')
        user.forceFill({ a: 1, b: 2 })
        expect(user['attributes']).toEqual({ a: 1, b: 2 })
      })
    })
  })
})
