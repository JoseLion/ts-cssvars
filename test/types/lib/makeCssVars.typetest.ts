import { expectTypeOf } from "expect-type";

import { CssVarContext, CssVars, makeCssVars, VarKey } from "../../../src/lib/makeCssVars";

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

expectTypeOf(cssvar("color")).toEqualTypeOf<"var(--color)">();
expectTypeOf(cssvar("gap")).toEqualTypeOf<"var(--gap)">();
// @ts-expect-error
expectTypeOf(cssvar("foo")).not.toEqualTypeOf<"var(--foo)">();

expectTypeOf(definitions).toEqualTypeOf<MultiVars>();

expectTypeOf(overwrite("color", "blue")).toEqualTypeOf<"--color: blue;">();
expectTypeOf(overwrite("gap", 50)).toEqualTypeOf<"--gap: 50;">();
// @ts-expect-error
expectTypeOf(overwrite("foo", false)).not.toEqualTypeOf<"--foo: false;">();
