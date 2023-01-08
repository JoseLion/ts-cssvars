import { expect } from "@stackbuilders/assertive-ts";

import { makeCssVars } from "../../../src/lib/makeCssVars";

describe("[Unit] makeCssVars.test.ts", () => {
  it("cretates a cssvar context object", () => {
    const context = makeCssVars(`
      --primary-color: red;
      --secondary-color: blue;
    `);

    expect(context).toContainAllKeys(["cssvar", "definitions", "overwrite"]);
  });

  describe(".cssvar", () => {
    it("returns the key on a cssvar function syntax", () => {
      const { cssvar } = makeCssVars(`
        --primary-color: red;
        --secondary-color: blue;
      `);

      expect(cssvar("primary-color")).toBeEqual("var(--primary-color)");
      expect(cssvar("secondary-color")).toBeEqual("var(--secondary-color)");
    });
  });

  describe("#definitions", () => {
    it("contains the definitions passed to the make the css vars", () => {
      const { definitions } = makeCssVars(`
        --primary-color: red;
        --secondary-color: blue;
      `);

      expect(definitions).toBeEqual(`
        --primary-color: red;
        --secondary-color: blue;
      `);
    });
  });

  describe(".overwrite", () => {
    it("creates a single css definition with the key and the value passed", () => {
      const { overwrite } = makeCssVars(`
        --gap: 30;
        --primary-color: red;
      `);

      expect(overwrite("gap", 50)).toBeEqual("--gap: 50;");
      expect(overwrite("primary-color", "blue")).toBeEqual("--primary-color: blue;");
    });
  });
});
