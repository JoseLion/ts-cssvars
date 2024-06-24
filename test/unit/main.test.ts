import { expect } from "@assertive-ts/core";
import { expectTypeOf, it, suite } from "vitest";

import {
  type CssVarContext,
  type CssVars,
  type MergeVars,
  type VarKey,
  makeCssVars,
  mergeCssVars,
} from "../../src/main";

import type { NonEmptyArray } from "../../src/helpers/common";

suite("[Unit] index.test.ts", () => {
  it("exports the lib functions", () => {
    expect(makeCssVars).toExist();
    expect(mergeCssVars).toExist();
  });

  it("defines the proper types", () => {
    expectTypeOf<CssVarContext<string>>().not.toBeAny();
    expectTypeOf<CssVars<string>>().not.toBeAny();
    expectTypeOf<VarKey<string>>().not.toBeAny();
    expectTypeOf<MergeVars<NonEmptyArray<CssVarContext<string>>>>().not.toBeAny();
  });
});
