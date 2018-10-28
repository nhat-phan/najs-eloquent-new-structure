/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import { HasOneOrMany } from './HasOneOrMany';
import { MorphOneExecutor } from './executors/MorphOneExecutor';
export declare class MorphOne<T> extends HasOneOrMany<T> {
    protected targetMorphTypeName: string;
    protected executor: MorphOneExecutor<T>;
    constructor(root: Model, relationName: string, target: ModelDefinition, targetType: string, targetKey: string, rootKey: string);
    getClassName(): string;
    getType(): string;
    getExecutor(): MorphOneExecutor<T>;
}
