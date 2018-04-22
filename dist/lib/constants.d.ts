export declare const NajsEloquent: {
    Driver: {
        DummyDriver: string;
        MongooseDriver: string;
        KnexDriver: string;
    };
    Model: {
        Component: {
            ModelAttribute: string;
            DynamicAttribute: string;
            ModelFillable: string;
            ModelQuery: string;
            ModelTimestamps: string;
            ModelSerialization: string;
            SoftDeletes: string;
        };
    };
    QueryBuilder: {
        MongooseQueryBuilder: string;
        MongodbConditionConverter: string;
        MongooseQueryLog: string;
    };
    Database: {
        Seeder: string;
    };
    Factory: {
        FactoryManager: string;
    };
    QueryLog: {
        FlipFlopQueryLog: string;
    };
    Provider: {
        ComponentProvider: string;
        DriverProvider: string;
        MongooseProvider: string;
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
