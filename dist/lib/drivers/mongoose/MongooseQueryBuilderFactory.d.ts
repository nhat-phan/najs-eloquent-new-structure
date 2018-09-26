/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilderFactory.d.ts" />
import { MongooseQueryBuilder } from './MongooseQueryBuilder';
export declare class MongooseQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
    static className: string;
    getClassName(): string;
    make(model: NajsEloquent.Model.IModel): MongooseQueryBuilder<any>;
}
