declare namespace NajsEloquent.Relation {
    interface IHasOne<T> extends IRelation<T> {
        associate(model: T): this;
        dissociate(): this;
    }
}
