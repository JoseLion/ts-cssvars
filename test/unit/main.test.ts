import { expect } from "@assertive-ts/core";

import { makeCssVars, mergeCssVars } from "../../src/main";

describe("[Unit] index.test.ts", () => {
  it("exports the lib functions", () => {
    expect(makeCssVars).toExist();
    expect(mergeCssVars).toExist();
  });
});
