import { expect } from "@assertive-ts/core";
import { describe, expectTypeOf, it, suite } from "vitest";

import { type CssVarContext, type CssVars, type VarKey, makeCssVars } from "../../../src/lib/makeCssVars";

type OneVar = `
  --gap: 10;
`;

type MultiVars = `
  --color: red;
  --gap: 10;
`;

const { cssvar, definitions, overwrite } = makeCssVars(`
  --color: red;
  --gap: 10;
`);

suite("[Unit] makeCssVars.test.ts", () => {
  it("cretates a cssvar context object", () => {
    const context = makeCssVars(`
      --primary-color: red;
      --secondary-color: blue;
    `);

    expect(context).toContainAllKeys("cssvar", "definitions", "overwrite");
  });

  describe(".cssvar", () => {
    it("returns the key on a cssvar function syntax", () => {
      expect(cssvar("color")).toBeEqual("var(--color)");
      expect(cssvar("gap")).toBeEqual("var(--gap)");
    });

    it("defines the proper types", () => {
      expectTypeOf(cssvar("color")).toEqualTypeOf<"var(--color)">();
      expectTypeOf(cssvar("gap")).toEqualTypeOf<"var(--gap)">();
      // @ts-expect-error wrong var name
      expectTypeOf(cssvar("foo")).not.toEqualTypeOf<"var(--foo)">();
    });
  });

  describe("#definitions", () => {
    it("contains the definitions passed to the make the css vars", () => {
      expect(definitions).toBeEqual("\n  --color: red;\n  --gap: 10;\n");
    });

    it("defines the proper types", () => {
      expectTypeOf(definitions).toEqualTypeOf<MultiVars>();
    });
  });

  describe(".overwrite", () => {
    it("creates a single css definition with the key and the value passed", () => {
      expect(overwrite("gap", 50)).toBeEqual("--gap: 50;");
      expect(overwrite("color", "blue")).toBeEqual("--color: blue;");
    });

    it("defines the proper types", () => {
      expectTypeOf(overwrite("color", "blue")).toEqualTypeOf<"--color: blue;">();
      expectTypeOf(overwrite("gap", 50)).toEqualTypeOf<"--gap: 50;">();
      // @ts-expect-error wrong var name
      expectTypeOf(overwrite("foo", false)).not.toEqualTypeOf<"--foo: false;">();
    });
  });

  it("defines the proper types", () => {
    expectTypeOf<VarKey<"...">>().toBeNever();
    expectTypeOf<VarKey<"--gap: 10;">>().toEqualTypeOf<"gap">();
    expectTypeOf<VarKey<OneVar>>().toEqualTypeOf<"gap">();

    expectTypeOf<CssVars<"...">>().toBeNever();
    expectTypeOf<CssVars<"--gap: 10;">>().toEqualTypeOf<"gap">();
    expectTypeOf<CssVars<MultiVars>>().toEqualTypeOf<"color" | "gap">();

    expectTypeOf<CssVarContext<"...">>().toMatchTypeOf<{
      cssvar: (varname: never) => `var(--${never})`;
      definitions: "...";
      overwrite: (varname: never, value: string | number) => `--${never}: ${typeof value};`;
    }>();
    expectTypeOf<CssVarContext<"--gap: 10;">>().toMatchTypeOf<{
      cssvar: (varname: "gap") => "var(--gap)";
      definitions: "--gap: 10;";
      overwrite: (varname: "gap", value: string | number) => `--gap: ${typeof value};`;
    }>();
    expectTypeOf<CssVarContext<OneVar>>().toMatchTypeOf<{
      cssvar: (varname: "gap") => "var(--gap)";
      definitions: OneVar;
      overwrite: (varname: "gap", value: string | number) => `--gap: ${typeof value};`;
    }>();
    expectTypeOf<CssVarContext<MultiVars>>().toMatchTypeOf<{
      cssvar: (varname: "color" | "gap") => `var(--${typeof varname})`;
      definitions: MultiVars;
      overwrite: (varname: "color" | "gap", value: string | number) => `--${typeof varname}: ${typeof value};`;
    }>();
  });
});
