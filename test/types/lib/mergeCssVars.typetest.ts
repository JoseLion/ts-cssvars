import { expectTypeOf } from "expect-type";

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

const mainCssVars = mergeCssVars(baseCssVars, navCssVars);

expectTypeOf<MergeVars<[typeof baseCssVars, typeof navCssVars]>>().toMatchTypeOf<CssVarContext<AllVars>>();

expectTypeOf(mainCssVars).toMatchTypeOf<CssVarContext<AllVars>>();
