declare namespace NajsEloquent.Model {
    class IModelFillableMembers {
        protected fillable?: string[];
        protected guarded?: string[];
    }
    interface IModelFillable extends IModelFillableMembers {
        getFillable(): string[];
        getGuarded(): string[];
        isFillable(key: string): boolean;
        isGuarded(key: string): boolean;
    }
}
