declare namespace NajsEloquent.Relation {
    interface IPivotOptions {
        foreignKeys: [string, string];
        fields?: Array<string>;
    }
}
