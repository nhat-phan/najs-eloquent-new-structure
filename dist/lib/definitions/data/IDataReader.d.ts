declare namespace NajsEloquent.Data {
    interface IDataReader<T> {
        /**
         * Get an attribute of data.
         *
         * @param {T} data
         * @param {string} field
         */
        getAttribute<R>(data: T, field: string): R;
        /**
         * Pick some fields in data.
         *
         * @param {object} data
         * @param {string[]} fields
         */
        pick(data: T, fields: string[]): T;
    }
}