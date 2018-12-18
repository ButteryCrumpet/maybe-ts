/** 
 * Implementation of Maybe (Some | None)
 * draws heavily from Elm's implementation
 * 
 * @module Maybe
 * @author Simon Leigh
*/


export type Maybe<T> = Some<T> | None
export type Some<T> = [true, T]
export type None = [false, null]

/**
 * Create a Some<T> with value
 */
export const Some: <T>(value: T) => Some<T>
  = value => [true, value]


/**
 * Create a None
 */
export const None: () => None
  = () => [false, null]


/**
 * Check if Maybe<T> is Some<T>
 */
export const isSome = <T>(maybe: Maybe<T>): maybe is Some<T> => maybe[0]


/**
 * Check if Maybe<T> is None
 */
export const isNone = <T>(maybe: Maybe<T>): maybe is None => !maybe[0]


/**
 * Maps a Maybe<T> to a Maybe<U> using passed in function
 * returns None if passed Maybe<T> is None
 */
export const map: <T, U>(fn: (value: T) => U) => (maybe: Maybe<T>) => Maybe<U>
  = fn => maybe => isSome(maybe) ? Some(fn(maybe[1])) : maybe


/**
 * Chain operations on a Maybe<T> that may also return a Maybe
 * short circuits and returns None if passed Maybe<T> is None
 */
export const andThen: <T, U>(fn: (value: T) => Maybe<U>) => (maybe: Maybe<T>) => Maybe<U>
  = fn => maybe => isSome(maybe) ? fn(maybe[1]) : maybe


/**
 * Returns the value of a Some<T> or the provided default
 * if None
 */
export const withDefault: <T>(fallback: T) => (maybe: Maybe<T>) => T
  = fallback => maybe => isSome(maybe) ? maybe[1] : fallback


export const unwrap: <T>(some: Some<T>) => T
  = some => some[1]