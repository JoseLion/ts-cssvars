import { expect } from "@stackbuilders/assertive-ts";

import { makeCssVars, mergeCssVars } from "../../src/index";

describe("[Unit] index.test.ts", () => {
  it("exports the lib functions", () => {
    expect(makeCssVars).toExist();
    expect(mergeCssVars).toExist();
  });
});
