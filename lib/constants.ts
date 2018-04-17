export const NajsEloquent = {
  Driver: {
    DummyDriver: 'NajsEloquent.Driver.DummyDriver',
    MongooseDriver: 'NajsEloquent.Driver.MongooseDriver',
    KnexDriver: 'NajsEloquent.Driver.KnexDriver'
  },
  Model: {
    Component: {
      Attribute: 'NajsEloquent.Model.Component.Attribute',
      DynamicAttribute: 'NajsEloquent.Model.Component.DynamicAttribute',
      Fillable: 'NajsEloquent.Model.Component.Fillable',
      Timestamps: 'NajsEloquent.Model.Component.Timestamps',
      Serialization: 'NajsEloquent.Model.Component.Serialization',
      SoftDeletes: 'NajsEloquent.Model.Component.SoftDeletes'
    }
  },
  QueryBuilder: {},
  Database: {
    Seeder: 'NajsEloquent.Database.Seeder'
  },
  Log: {
    FlipFlopQueryLog: 'NajsEloquent.Log.FlipFlopQueryLog'
  },
  Provider: {
    ComponentProvider: 'NajsEloquent.Provider.ComponentProvider',
    DriverProvider: 'NajsEloquent.Provider.DriverProvider',
    MongooseProvider: 'NajsEloquent.Provider.MongooseProvider'
  }
}
