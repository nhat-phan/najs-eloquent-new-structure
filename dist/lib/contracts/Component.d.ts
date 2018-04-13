declare namespace Najs.Contracts.Eloquent {
    interface Component extends Najs.Contracts.Autoload {
        /**
         * Extend a prototype of model
         *
         * @param {Object} prototype Model prototype
         */
        extend(prototype: Object): void;
    }
}
