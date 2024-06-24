import { type CssVarContext, makeCssVars } from "./makeCssVars";

import type { NonEmptyArray } from "../helpers/common";

/**
 * Recursively merge all CssVarContext on an array into a single CssVarContext.
 */
export type MergeVars<T extends NonEmptyArray<CssVarContext<string>>> =
  T extends [infer H, ...infer R]
    ? H extends CssVarContext<infer T2>
      ? R extends NonEmptyArray<CssVarContext<string>>
        ? MergeVars<R> extends CssVarContext<infer T3>
          ? CssVarContext<`${T2}${T3}`>
          : never
        : H
      : never
    : never;

/**
 * Merges two or more `CssVarContext` object into a single context. Usefull to
 * make the css variable definitions modular and use the all together from a
 * single place.
 *
 * @example
 * ```ts
 * export const baseCssVars = makeCssVars(`
 *   --primary-color: red;
 *   --secondary-color: blue;
 * `);
 *
 * export const navCssVars = makeCssVars(`
 *   --gap: 5%;
 *   --nav-width: 500;
 * `);
 *
 * export const mainCssVars = mergeCssVars(baseCssVars, navCssVars);
 * ```
 *
 * @param cssVars the `CssVarContext` objects to merge
 * @returns a merged `CssVarContext` object
 */
export function mergeCssVars<T extends NonEmptyArray<CssVarContext<string>>>(...cssVars: T): MergeVars<T> {
  const allDefinitions = cssVars.reduce<string>((acc, cssVar) => {
    const separator = cssVar.definitions.startsWith("\n")
      ? ""
      : "\n";

    return `${acc}${separator}${cssVar.definitions}`;
  }, "");

  return makeCssVars(allDefinitions) as MergeVars<T>;
}
