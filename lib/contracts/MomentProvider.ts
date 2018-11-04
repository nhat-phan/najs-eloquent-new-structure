namespace Najs.Contracts.Eloquent {
  export interface MomentProvider<T> extends Najs.Contracts.Autoload {
    /**
     * Make moment instance
     */
    make(): T

    /**
     * Determine that the given value is Moment or not
     */
    isMoment(value: any): boolean

    /**
     * Set now value to the Moment instance
     */
    setNow(cb: () => any): this
  }
}
