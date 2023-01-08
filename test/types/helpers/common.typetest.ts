import { expectTypeOf } from "expect-type";

import { NonEmptyArray } from "../../../src/helpers/common";

expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1]);
expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1, 2]);
expectTypeOf<NonEmptyArray<number>>().toMatchTypeOf([1, 2, 3]);

expectTypeOf<NonEmptyArray<number>>().not.toMatchTypeOf([]);
