import { array_unique } from './util/functions'

export const NajsEloquent = {
  Driver: {
    DummyDriver: 'NajsEloquent.Driver.DummyDriver'
  },
  Feature: {
    SettingFeature: 'NajsEloquent.Feature.SettingFeature',
    RecordManager: 'NajsEloquent.Feature.RecordManager',
    FillableFeature: 'NajsEloquent.Feature.FillableFeature',
    SerializationFeature: 'NajsEloquent.Feature.SerializationFeature',
    TimestampsFeature: 'NajsEloquent.Feature.TimestampsFeature'
  },
  Provider: {
    DriverProvider: 'NajsEloquent.Provider.DriverProvider'
  }
}

export const QueryFunctions = {
  BasicQuery: [
    'queryName',
    'setLogGroup',
    'getPrimaryKeyName',
    'select',
    'limit',
    'orderBy',
    'orderByAsc',
    'orderByDesc'
  ],
  ConditionQuery: [
    'where',
    'andWhere',
    'orWhere',
    'whereNot',
    'andWhereNot',
    'orWhereNot',
    'whereIn',
    'andWhereIn',
    'orWhereIn',
    'whereNotIn',
    'andWhereNotIn',
    'orWhereNotIn',
    'whereNull',
    'andWhereNull',
    'orWhereNull',
    'whereNotNull',
    'andWhereNotNull',
    'orWhereNotNull',
    'whereBetween',
    'andWhereBetween',
    'orWhereBetween',
    'whereNotBetween',
    'andWhereNotBetween',
    'orWhereNotBetween'
  ],
  SoftDeleteQuery: ['withTrashed', 'onlyTrashed'],
  FetchResultQuery: ['get', 'first', 'count', 'update', 'delete', 'restore', 'execute'],
  AdvancedQuery: ['first', 'find', 'get', 'all', 'count', 'pluck', 'findById', 'findOrFail', 'firstOrFail']
}
export const StartQueryFunctions = array_unique(
  QueryFunctions.AdvancedQuery,
  QueryFunctions.SoftDeleteQuery,
  QueryFunctions.FetchResultQuery.filter(name => ['update', 'delete', 'restore', 'execute'].indexOf(name) === -1),
  QueryFunctions.BasicQuery.filter(name => name !== 'getPrimaryKeyName'),
  QueryFunctions.ConditionQuery.filter(name => name.indexOf('where') === 0)
)
