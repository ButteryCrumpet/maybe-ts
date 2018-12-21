import * as Maybe from "../src/main"

describe("Maybe", () => {

  test("Some<T>", () => {
    expect(Maybe.isSome(Maybe.Some("hu"))).toBe(true)
    expect(Maybe.isNone(Maybe.Some("hu"))).toBe(false)
  })

  test("None", () => {
    expect(Maybe.isNone(Maybe.None())).toBe(true)
    expect(Maybe.isNone(Maybe.Some("hu"))).toBe(false)
  })

  test("map", () => {
    expect(Maybe.map((x: number) => x * 2)(Maybe.Some(5))).toEqual(Maybe.Some(10))
    expect(Maybe.map((x: number) => x * 2)(Maybe.None())).toEqual(Maybe.None())
  })

  test("andThen", () => {
    expect(Maybe.andThen((_) => Maybe.Some(5))(Maybe.Some(1))).toEqual(Maybe.Some(5))
    expect(Maybe.andThen((_) => Maybe.Some(5))(Maybe.None())).toEqual(Maybe.None())
  })

  test("withDefault", () => {
    expect(Maybe.withDefault("default")(Maybe.None())).toEqual("default")
    expect(Maybe.withDefault("default")(Maybe.Some("value"))).toEqual("value")
  })

})