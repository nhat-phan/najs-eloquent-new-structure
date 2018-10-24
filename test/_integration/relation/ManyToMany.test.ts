import 'jest'
import { Model, BelongsToMany, Factory, factory } from '../../../lib'
import { register } from 'najs-binding'

class Role extends Model {
  users: BelongsToMany<User>

  getClassName() {
    return 'Role'
  }

  get usersRelation() {
    return this.defineRelation('users').belongsToMany(User, 'user_roles')
  }
}
register(Role)

class User extends Model {
  roles: BelongsToMany<Role>

  getClassName() {
    return 'User'
  }

  get rolesRelation() {
    return this.defineRelation('roles').belongsToMany(Role, 'user_roles')
  }
}
register(User)

Factory.define(User, function(faker, attributes) {
  return Object.assign(
    {},
    {
      first_name: faker.first(),
      last_name: faker.last()
    },
    attributes
  )
})

Factory.define(Role, function(faker, attributes) {
  return Object.assign(
    {},
    {
      name: faker.word()
    },
    attributes
  )
})

describe('ManyToManyRelationship', function() {
  it('should work', async function() {
    const user = factory(User).make()
    const roleA = await factory(Role).create({ name: 'a' })
    const roleB = await factory(Role).create({ name: 'b' })

    await user.rolesRelation.attach(roleA.id)
    await user.rolesRelation.attach(roleB.id)
    await user.save()

    const pivotData = await user.rolesRelation
      .newPivotQuery()
      .where('user_id', user.id)
      .get()

    // console.log(pivotData.first()['internalData']['relationDataBucket'])
    expect(pivotData.pluck('user_id', 'role_id').all()).toEqual({
      [roleA.id]: user.id,
      [roleB.id]: user.id
    })

    // const result = await User.findOrFail(user.id)
    // console.log(result.roles)
    // console.log(result['internalData'])
    // await result.load('roles')
    // console.log(result['internalData'])
    // console.log(result.roles)

    // console.log(user.roles)
    // await user.load('roles')
    // console.log(user.roles)
  })
})
