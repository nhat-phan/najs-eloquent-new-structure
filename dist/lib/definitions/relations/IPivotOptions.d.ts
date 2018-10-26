declare namespace NajsEloquent.Relation {
    type PivotForeignKey = string;
    interface IPivotOptions {
        foreignKeys: [PivotForeignKey, PivotForeignKey];
        name?: string;
        fields?: Array<string>;
    }
}
