import { expectTypeOf, it, suite } from "vitest";

import type { NonEmptyArray } from "../../../src/main";

suite("[Unit] common.test.ts", () => {
  it("defines the proper types", () => {
    expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1]);
    expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1, 2]);
    expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1, 2, 3]);

    expectTypeOf<NonEmptyArray<number>>().not.toMatchTypeOf([]);
  });
});
