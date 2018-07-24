/// <reference path="../../definitions/model/IModel.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { KnexQueryBuilderHandle } from './KnexQueryBuilderHandle';
export declare class KnexQueryBuilder<T extends IModel, Handle extends KnexQueryBuilderHandle> extends QueryBuilder<T, Handle> {
    doSomething(): void;
}
