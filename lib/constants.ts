export const NajsEloquent = {
  Driver: {
    DummyDriver: 'NajsEloquent.Driver.DummyDriver',
    MongooseDriver: 'NajsEloquent.Driver.MongooseDriver',
    KnexDriver: 'NajsEloquent.Driver.KnexDriver'
  },
  Model: {
    Component: {
      ModelAttribute: 'NajsEloquent.Model.Component.ModelAttribute',
      DynamicAttribute: 'NajsEloquent.Model.Component.DynamicAttribute',
      ModelFillable: 'NajsEloquent.Model.Component.ModelFillable',
      ModelQuery: 'NajsEloquent.Model.Component.ModelQuery',
      Timestamps: 'NajsEloquent.Model.Component.Timestamps',
      ModelSerialization: 'NajsEloquent.Model.Component.ModelSerialization',
      SoftDeletes: 'NajsEloquent.Model.Component.SoftDeletes'
    }
  },
  QueryBuilder: {
    MongooseQueryBuilder: 'NajsEloquent.QueryBuilder.Mongodb.MongooseQueryBuilder',
    MongodbConditionConverter: 'NajsEloquent.QueryBuilder.Mongodb.MongodbConditionConverter',
    MongooseQueryLog: 'NajsEloquent.QueryBuilder.Mongodb.MongooseQueryLog'
  },
  Database: {
    Seeder: 'NajsEloquent.Database.Seeder'
  },
  QueryLog: {
    FlipFlopQueryLog: 'NajsEloquent.QueryLog.FlipFlopQueryLog'
  },
  Provider: {
    ComponentProvider: 'NajsEloquent.Provider.ComponentProvider',
    DriverProvider: 'NajsEloquent.Provider.DriverProvider',
    MongooseProvider: 'NajsEloquent.Provider.MongooseProvider'
  }
}
