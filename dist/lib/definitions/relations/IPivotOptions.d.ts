declare namespace NajsEloquent.Relation {
    interface IPivotOptions {
        name: string;
        foreignKeys: [string, string];
        fields?: Array<string>;
    }
}
