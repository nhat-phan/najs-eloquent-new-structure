/// <reference path="../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../lib/definitions/collect.js/index.d.ts" />
import Autoload = Najs.Contracts.Autoload;
export declare class RelationDataBucket<T = {}> implements Autoload, NajsEloquent.Relation.IRelationDataBucket<T> {
    protected bucket: {
        [key in string]: CollectJs.Collection<T>;
    };
    constructor();
    getClassName(): string;
    add(model: NajsEloquent.Model.IModel): this;
    makeModel<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M, record: T): M;
    getRecords<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M): CollectJs.Collection<T>;
}
