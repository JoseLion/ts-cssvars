import { expectTypeOf } from "expect-type";

import { NonEmptyArray } from "../../src/helpers/common";
import { CssVarContext, CssVars, VarKey, MergeVars } from "../../src/index";

expectTypeOf<CssVarContext<string>>().not.toBeAny();
expectTypeOf<CssVars<string>>().not.toBeAny();
expectTypeOf<VarKey<string>>().not.toBeAny();
expectTypeOf<MergeVars<NonEmptyArray<CssVarContext<string>>>>().not.toBeAny();
