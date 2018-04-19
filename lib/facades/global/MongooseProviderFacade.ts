/// <reference path="../../contracts/DriverProvider.ts" />

import '../../providers/MongooseProvider'
import { make } from 'najs-binding'
import { Facade, IFacade, IFacadeBase } from 'najs-facade'
import { container } from '../container'
import { Mongoose, Model, Schema, Document } from 'mongoose'
import { NajsEloquent } from '../../constants'

const facade = Facade.create<Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>>>(
  container,
  'MongooseProvider',
  function() {
    return make<Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>>>(
      NajsEloquent.Provider.MongooseProvider
    )
  }
)

export const MongooseProviderFacade: Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>> &
  IFacade = facade
export const MongooseProvider: Najs.Contracts.Eloquent.MongooseProvider<Mongoose, Schema, Model<Document>> &
  IFacadeBase = facade
