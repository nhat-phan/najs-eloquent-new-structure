/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelation.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import RelationDefinition = NajsEloquent.Relation.RelationDefinition;
export declare class RelationDefinitionFinder {
    model: IModel;
    prototype: object;
    bases: object[];
    constructor(model: IModel, prototype: object, bases: object[]);
    getDefinitions(): {};
    findDefinitionsInPrototype(prototype: object): {};
    findDefinition(target: string, descriptor: PropertyDescriptor): RelationDefinition | undefined;
}
