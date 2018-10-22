namespace NajsEloquent.Relation {
  export interface IPivotOptions {
    name: string

    foreignKeys: [string, string]

    fields?: Array<string>
  }
}
