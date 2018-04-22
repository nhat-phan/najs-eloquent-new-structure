declare namespace NajsEloquent.Model {
    interface IModelSetting {
        getArrayUniqueSetting(property: string, defaultValue: string[]): string[];
    }
}
