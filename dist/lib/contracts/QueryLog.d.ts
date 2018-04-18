declare namespace Najs.Contracts.Eloquent {
    type QueryLogTransform<T> = {
        (item: QueryLogItem<T>): QueryLogItem<T>;
    };
    type QueryLogItem<T> = {
        query: T;
        when: Object;
        group: string;
    };
    interface QueryLog extends Najs.Contracts.Autoload {
        /**
         * Determine the QueryLog is enabled or not
         */
        isEnabled(): boolean;
        /**
         * Enable the QueryLog
         */
        enable(): this;
        /**
         * Disable the QueryLog
         */
        disable(): this;
        /**
         * Clear all query in the QueryLog
         */
        clear(): this;
        /**
         * Push a query to log pool
         *
         * @param {mixed} query
         */
        push<T>(query: T): this;
        /**
         * Push a query to log pool
         *
         * @param {mixed} query
         * @param {string} group
         */
        push<T>(query: T, group: string): this;
        /**
         * Get and delete all queries
         */
        pull<T>(): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         */
        pull<T>(group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         * @param {Moment} since
         */
        pull<T>(group: string, since: Object): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         * @param {Moment} since
         * @param {Moment} until
         */
        pull<T>(group: string, since: Object, until: Object): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         * @param {Moment} since
         * @param {Moment} until
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         */
        pull<T>(group: string, since: Object, until: Object, transform: QueryLogTransform<T>): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         * @param {Moment} since
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         */
        pull<T>(group: string, since: Object, transform: QueryLogTransform<T>): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {string} group
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         */
        pull<T>(group: string, transform: QueryLogTransform<T>): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         */
        pull<T>(since: Object): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {string} group
         */
        pull<T>(since: Object, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {Moment} until
         */
        pull<T>(since: Object, until: Object): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {Moment} until
         * @param {string} group
         */
        pull<T>(since: Object, until: Object, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {Moment} until
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {string} group
         */
        pull<T>(since: Object, until: Object, transform: QueryLogTransform<T>, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         */
        pull<T>(since: Object, transform: QueryLogTransform<T>): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Moment} since
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {string} group
         */
        pull<T>(since: Object, transform: QueryLogTransform<T>, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         */
        pull<T>(transform: QueryLogTransform<T>): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {string} group
         */
        pull<T>(transform: QueryLogTransform<T>, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {Moment} since
         */
        pull<T>(transform: QueryLogTransform<T>, since: Object): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {Moment} since
         * @param {Moment} until
         * @param {string} group
         */
        pull<T>(transform: QueryLogTransform<T>, since: Object, group: string): QueryLogItem<T>[];
        /**
         * Get and delete all queries
         *
         * @param {Najs.Contracts.Eloquent.QueryLogTransform<T>} transform
         * @param {Moment} since
         * @param {Moment} until
         * @param {string} group
         */
        pull<T>(transform: QueryLogTransform<T>, since: Object, until: Object, group: string): QueryLogItem<T>[];
    }
}
