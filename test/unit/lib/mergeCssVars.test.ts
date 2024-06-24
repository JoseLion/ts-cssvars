import { expect } from "@assertive-ts/core";
import { expectTypeOf, it, suite } from "vitest";

import { type CssVarContext, makeCssVars } from "../../../src/lib/makeCssVars";
import { type MergeVars, mergeCssVars } from "../../../src/lib/mergeCssVars";

type AllVars = `
  --primary-color: red;
  --secondary-color: blue;

  --gap: 5%;
  --nav-width: 500;
`;

const baseCssVars = makeCssVars(`
  --primary-color: red;
  --secondary-color: blue;
`);
const navCssVars = makeCssVars(`
  --gap: 5%;
  --nav-width: 500;
`);
const mergedDefinitions = `
  --primary-color: red;
  --secondary-color: blue;

  --gap: 5%;
  --nav-width: 500;
`;
const mainCssVars = mergeCssVars(baseCssVars, navCssVars);

suite("[Unit] mergeCssVars.test.ts", () => {
  it("merges all contexts into a single one", () => {
    const { definitions } = mainCssVars;

    expect(definitions).toBeEqual(mergedDefinitions);
  });

  it("defines the proper types", () => {
    expectTypeOf<MergeVars<[typeof baseCssVars, typeof navCssVars]>>().toMatchTypeOf<CssVarContext<AllVars>>();
    expectTypeOf(mainCssVars).toMatchTypeOf<CssVarContext<AllVars>>();
  });
});
