import { expectTypeOf } from "expect-type";

import { CssVarContext, CssVars, VarKey } from "../../src/index";

expectTypeOf<CssVarContext<string>>().not.toBeAny();
expectTypeOf<CssVars<string>>().not.toBeAny();
expectTypeOf<VarKey<string>>().not.toBeAny();
