/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelation.d.ts" />
/// <reference path="../definitions/relations/IRelationFactory.d.ts" />
/// <reference path="../definitions/relations/IHasOne.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import IRelation = NajsEloquent.Relation.IRelation;
import IHasOne = NajsEloquent.Relation.IHasOne;
import './basic/HasOne';
export declare class RelationFactory {
    protected rootModel: IModel;
    protected name: string;
    protected relation: IRelation<any>;
    constructor(rootModel: IModel, name: string);
    hasOne<T extends IModel>(model: string | ModelDefinition<any>, foreignKey?: string, localKey?: string): IHasOne<T>;
    make<T extends IRelation<any>>(className: string, params: any[], modifier?: (relation: T) => void): T;
}
