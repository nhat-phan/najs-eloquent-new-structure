declare namespace NajsEloquent.Model {
    class IModelSerializationMembers {
        protected visible?: string[];
        protected hidden?: string[];
    }
    interface IModelSerialization extends IModelSerializationMembers {
        getVisible(): string[];
        getHidden(): string[];
        isVisible(key: string): boolean;
        isHidden(key: string): boolean;
        toObject(): Object;
        toJSON(): Object;
        toJson(): Object;
    }
}
