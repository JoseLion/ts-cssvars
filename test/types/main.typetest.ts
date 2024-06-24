import { expectTypeOf } from "expect-type";

import type { NonEmptyArray } from "../../src/helpers/common";
import type { CssVarContext, CssVars, MergeVars, VarKey } from "../../src/main";

expectTypeOf<CssVarContext<string>>().not.toBeAny();
expectTypeOf<CssVars<string>>().not.toBeAny();
expectTypeOf<VarKey<string>>().not.toBeAny();
expectTypeOf<MergeVars<NonEmptyArray<CssVarContext<string>>>>().not.toBeAny();
