export declare const NajsEloquent: {
    Driver: {
        DummyDriver: string;
        MongodbDriver: string;
        MongooseDriver: string;
        Memory: {
            MemoryDataSource: string;
            MemoryExecutorFactory: string;
            RecordFilter: string;
            RecordConditionMatcherFactory: string;
        };
        Mongodb: {
            MongodbExecutorFactory: string;
            MongodbConditionMatcherFactory: string;
        };
        Mongoose: {
            MongooseDocumentManager: string;
            MongooseExecutorFactory: string;
        };
        Knex: {
            KnexWrapper: string;
        };
    };
    Feature: {
        RecordManager: string;
        SettingFeature: string;
        EventFeature: string;
        FillableFeature: string;
        SerializationFeature: string;
        TimestampsFeature: string;
        SoftDeletesFeature: string;
        RelationFeature: string;
    };
    Provider: {
        DriverProvider: string;
        MemoryDataSourceProvider: string;
        MongodbProvider: string;
        MongooseProvider: string;
        KnexProvider: string;
    };
    QueryBuilder: {
        MongodbConditionConverter: string;
    };
    QueryLog: {
        FlipFlopQueryLog: string;
    };
    Relation: {
        RelationDataBucket: string;
        HasOneRelation: string;
    };
};
export declare const QueryFunctions: {
    BasicQuery: string[];
    ConditionQuery: string[];
    SoftDeleteQuery: string[];
    FetchResultQuery: string[];
    AdvancedQuery: string[];
};
export declare const StartQueryFunctions: string[];
