/// <reference path="../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../lib/definitions/collect.js/index.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import Autoload = Najs.Contracts.Autoload;
import { GenericData } from '../util/GenericData';
export declare class RelationDataBucket<T = {}> implements Autoload, IRelationDataBucket<T> {
    protected bucket: {
        [key in string]: {
            records: CollectJs.Collection<T>;
            metadata: GenericData;
        };
    };
    constructor();
    getClassName(): string;
    add(model: Model): this;
    makeModel<M extends Model = Model>(model: M, record: T): M;
    getRecords<M extends Model = Model>(model: M): CollectJs.Collection<T>;
    getMetadata(model: Model): GenericData;
    createKey(model: Model): string;
}
