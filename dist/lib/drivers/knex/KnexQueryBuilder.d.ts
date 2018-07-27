/// <reference path="../../definitions/model/IModel.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler';
export declare class KnexQueryBuilder<T extends IModel, H extends KnexQueryBuilderHandler> extends QueryBuilder<T, H> {
    doSomething(): void;
}
