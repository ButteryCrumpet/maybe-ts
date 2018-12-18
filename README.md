Typescript Maybe<T> Implementation
==================================

# Description

A simple implementation of the Maybe<T> monad in Typescript.
Useful for optional values / fields, error handling etc, while
keeping strong typing.

# Documentation

The Maybe<T> type is a union of Some<T> and None. To create a Some<T> \
or None use the functions provided, `Maybe.Some(value)` and `Maybe.None()`

## Example

```typescript
import * as Maybe from "maybe-ts"

const some: Maybe<number> = Maybe.Some(5) // Some<number> with value 5
const none: Maybe<number> = Maybe.None() // None

```

We can use `Maybe.isSome()` and `Maybe.isNone()` to check and \
(if using typescript) infer the type of the Maybe<T>

```typescript

if (Maybe.isSome(some)) { // some: Some<number>
    // do something
}

if (Maybe.isNone(none)) { // none: None
    // handle error or whatever
}

```

Checking whether a Maybe<T> is Some<T> or None however is usually \
only done at the end of a pipeline or even not at all. Maybe<T>s \
are monads and so can be mapped to other Maybe<any>s.\
This is done using `Maybe.map()` and `Maybe.andThen()`.

`Maybe.map` takes a map function of `T => U` for `Maybe<T>` while \
`Maybe.andThen` takes a map function of `T => Maybe<U>` for `Maybe<T>`

use `Maybe.map` for simple transformations and `Maybe.andThen` for when \
the function may returns a Maybe for some reason such as parsing error or \
an optional property

```typescript

const maybe_double = Maybe.map((x: number) => x * 2)
const doubledMaybe = maybe_double(some) // Some<number> with value 10
const doubledNone = maybe_double(none) // None


// parseInt: string => Maybe<number>
// numberToMonth: number => Maybe<string>

const parseMonth: string => Maybe<string>
    = input => {
        Maybe.andThen(numberToMonth)(parseInt(string))
    }

```

After chaining `Maybe.map` and `Maybe.andThen` calls (it's useful and much \
cleaner to have a pipe() implementation) you can either use `isNone` or `isSome` \
to decide how to continue or use `Maybe.withDefault` to return either the \
T contained by the Maybe<T> or a default T in the case of a None

```typescript

const default = Maybe.withDefault("Not a valid month")
const value = default((parseMonth("12"))) // "December"
const none = default((parseMonth("1typo2"))) // "Not a valid month"

```

Maybe allows you to compose functions that may fail or deal with data \
that have optional values while still keeping a declarative functional style