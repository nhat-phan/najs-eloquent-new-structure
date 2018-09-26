/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilderFactory.d.ts" />
import { MongodbQueryBuilder } from './MongodbQueryBuilder';
export declare class MongodbQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
    static className: string;
    getClassName(): string;
    make(model: NajsEloquent.Model.IModel): MongodbQueryBuilder<any>;
}
