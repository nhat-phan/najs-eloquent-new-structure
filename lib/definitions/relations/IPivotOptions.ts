namespace NajsEloquent.Relation {
  export interface IPivotOptions {
    foreignKeys: [string, string]

    fields?: Array<string>
  }
}
