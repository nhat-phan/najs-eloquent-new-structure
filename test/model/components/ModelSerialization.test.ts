import 'jest'
import * as Sinon from 'sinon'
import { Eloquent } from '../../../lib/model/Eloquent'
import { ModelSerialization } from '../../../lib/model/components/ModelSerialization'
import { ModelSetting } from '../../../lib/model/components/ModelSetting'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { EloquentDriverProvider } from '../../../lib/facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../../../lib/facades/global/EloquentComponentProviderFacade'

EloquentComponentProvider.register(ModelSerialization, 'serialization', true)
EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model/Serialization', function() {
  describe('Unit', function() {
    describe('.getClassName()', function() {
      it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.ModelSerialization" as class name', function() {
        const serialization = new ModelSerialization()
        expect(serialization.getClassName()).toEqual('NajsEloquent.Model.Component.ModelSerialization')
      })
    })

    describe('.extend()', function() {
      it('extends the given prototype with 8 functions', function() {
        const functions = {
          getVisible: 'getVisible',
          getHidden: 'getHidden',
          markVisible: 'markVisible',
          markHidden: 'markHidden',
          isVisible: 'isVisible',
          isHidden: 'isHidden',
          toObject: 'toObject',
          toJSON: 'toJSON',
          toJson: 'toJSON'
        }
        const prototype = {}
        const serialization = new ModelSerialization()
        serialization.extend(prototype, [], <any>{})
        for (const name in functions) {
          expect(typeof prototype[name] === 'function').toBe(true)
          expect(prototype[name] === ModelSerialization[functions[name]]).toBe(true)
        }
      })
    })

    describe('static .isVisible()', function() {
      it('uses ModelUtilities.isInWhiteList() with whiteList = .getVisible(), blackList = this.getHidden()', function() {
        const isInWhiteListStub = Sinon.stub(ModelSetting, 'isInWhiteList')
        isInWhiteListStub.returns('anything')

        const user = {
          getVisible() {
            return 'visible'
          },
          getHidden() {
            return 'hidden'
          }
        }
        user['isInWhiteList'] = ModelSetting.isInWhiteList

        expect(ModelSerialization.isVisible.call(user, 'test')).toEqual('anything')
        expect(isInWhiteListStub.calledWith('test', 'visible', 'hidden')).toBe(true)
        isInWhiteListStub.restore()
      })
    })

    describe('static .isGuarded()', function() {
      it('uses ModelUtilities.isInBlackList() with blackList = this.getHidden()', function() {
        const isInBlackListStub = Sinon.stub(ModelSetting, 'isInBlackList')
        isInBlackListStub.returns('anything')

        const user = {
          getHidden() {
            return 'hidden'
          }
        }
        user['isInBlackList'] = ModelSetting.isInBlackList

        expect(ModelSerialization.isHidden.call(user, 'test')).toEqual('anything')
        expect(isInBlackListStub.calledWith('test', 'hidden')).toBe(true)
        isInBlackListStub.restore()
      })
    })
  })

  describe('Integration', function() {
    class User extends Eloquent {
      static className = 'User'
      static visible = ['first_name', 'last_name']
    }

    class Post extends Eloquent {
      static className = 'Post'
      visible = ['title', 'content']
    }

    class Token extends Eloquent {
      static className = 'Token'
      static hidden = ['token']
    }

    class Secret extends Eloquent {
      static className = 'Secret'
      hidden = ['password']
    }

    describe('.getVisible()', function() {
      it('works with both kind of settings - static or member', function() {
        const user = new User()
        expect(user.getVisible()).toEqual(['first_name', 'last_name'])
        const post = new Post()
        expect(post.getVisible()).toEqual(['title', 'content'])
      })
    })

    describe('.markVisible()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.markVisible('test') === user).toBe(true)
      })
      it('can use to apply a temporary setting', function() {
        const user = new User()
        user.markVisible('password')
        expect(user.getVisible()).toEqual(['first_name', 'last_name', 'password'])
        expect(user['visible']).toEqual(['password'])
        expect(new User().getVisible()).toEqual(['first_name', 'last_name'])

        const post = new Post()
        post.markVisible('view')
        expect(post.getVisible()).toEqual(['title', 'content', 'view'])
        expect(post['visible']).toEqual(['title', 'content', 'view'])
        expect(new Post().getVisible()).toEqual(['title', 'content'])
      })
    })

    describe('.getHidden()', function() {
      it('has default value is []', function() {
        const user = new User()
        expect(user.getHidden()).toEqual([])
        const post = new Post()
        expect(post.getHidden()).toEqual([])
      })
      it('works with both kind of settings - static or member', function() {
        const token = new Token()
        expect(token.getHidden()).toEqual(['token'])
        const secret = new Secret()
        expect(secret.getHidden()).toEqual(['password'])
      })
    })

    describe('.markHidden()', function() {
      it('is chainable.', function() {
        const user = new User()
        expect(user.markHidden('test') === user).toBe(true)
      })

      it('can use to apply a temporary setting', function() {
        const user = new User()
        user.markHidden('test')
        expect(user.getHidden()).toEqual(['test'])
        expect(new User().getHidden()).toEqual([])

        const post = new Post()
        post.markHidden('test')
        expect(post.getHidden()).toEqual(['test'])
        expect(new Post().getHidden()).toEqual([])

        const token = new Token()
        token.markHidden('test')
        expect(token.getHidden()).toEqual(['token', 'test'])
        expect(token['hidden']).toEqual(['test'])
        expect(new Token().getHidden()).toEqual(['token'])

        const secret = new Secret()
        secret.markHidden('test')
        expect(secret.getHidden()).toEqual(['password', 'test'])
        expect(secret['hidden']).toEqual(['password', 'test'])
        expect(new Secret().getHidden()).toEqual(['password'])
      })
    })

    describe('.toObject()', function() {
      it('calls "driver".toObject()', function() {
        const user = new User()
        const driverToObjectStub = Sinon.stub(user['driver'], 'toObject')
        driverToObjectStub.returns('anything')

        expect(user.toObject()).toEqual('anything')
        expect(driverToObjectStub.called).toBe(true)
      })
    })

    describe('.toJSON()', function() {
      it('calls .toObject() and filters the key which allowed to visible in JSON', function() {
        const token = new Token()
        token.forceFill({ a: 1, b: 2, token: 'hidden' })

        expect(token.toObject()).toEqual({ a: 1, b: 2, token: 'hidden' })
        expect(token.toJSON()).toEqual({ a: 1, b: 2 })

        token.markHidden('b')
        expect(token.toJSON()).toEqual({ a: 1 })
      })
    })
  })
})
