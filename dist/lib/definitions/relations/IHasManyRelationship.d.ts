declare namespace NajsEloquent.Relation {
    interface IHasManyRelationship<T> extends IRelationship<CollectJs.Collection<T>> {
        associate(...models: Array<T | T[]>): this;
    }
}
