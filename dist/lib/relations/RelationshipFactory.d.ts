/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelationship.d.ts" />
/// <reference path="../definitions/relations/IRelationshipFactory.d.ts" />
/// <reference path="../definitions/relations/IHasOneRelationship.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import IRelationship = NajsEloquent.Relation.IRelationship;
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship;
import IBelongsToRelationship = NajsEloquent.Relation.IBelongsToRelationship;
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship;
import './relationships/HasOne';
export declare class RelationshipFactory {
    protected rootModel: IModel;
    protected name: string;
    protected relationship: IRelationship<any>;
    constructor(rootModel: IModel, name: string);
    make<T extends IRelationship<any>>(className: string, params: any[], modifier?: (relation: T) => void): T;
    findForeignKeyName(referencing: IModel, referenced: IModel): string;
    protected findHasOneOrHasManyKeys(target: ModelDefinition<any>, targetKey?: string, localKey?: string): {
        targetKeyName: string;
        rootKeyName: string;
    };
    hasOne<T extends IModel>(target: ModelDefinition<any>, targetKey?: string, localKey?: string): IHasOneRelationship<T>;
    hasMany<T extends IModel>(target: ModelDefinition<any>, targetKey?: string, localKey?: string): IHasManyRelationship<T>;
    belongsTo<T extends IModel>(target: ModelDefinition<any>, targetKey?: string, localKey?: string): IBelongsToRelationship<T>;
}
