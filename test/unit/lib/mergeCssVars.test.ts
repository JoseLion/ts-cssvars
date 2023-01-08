import { expect } from "@stackbuilders/assertive-ts";

import { makeCssVars } from "../../../src/lib/makeCssVars";
import { mergeCssVars } from "../../../src/lib/mergeCssVars";

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

describe("[Unit] mergeCssVars.test.ts", () => {
  it("merges all contexts into a single one", () => {
    const { definitions } = mergeCssVars(baseCssVars, navCssVars);

    expect(definitions).toBeEqual(mergedDefinitions);
  });
});
