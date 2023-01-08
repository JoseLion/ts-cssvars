/**
 * Extracts the name of a single css varriable from a string
 */
export type VarKey<T extends string> =
  T extends `${string}--${infer K1}:${string};${string}`
    ? K1
    : never;

/**
 * Recursively extracts and joins the names of the css varriables from a string
 */
export type CssVars<T extends string> =
  T extends `${string}--${string}:${string};${infer R}`
    ? VarKey<T> | CssVars<R>
    : VarKey<T>;

/**
 * The css variables context created from a string containig the raw variable
 * definitions.
 */
export interface CssVarContext<T extends string> {
  /**
   * Creates a css `var(..)` function based of the `varname` parameter.
   *
   * @example
   * ```ts
   * cssvar("primary-color"); // var(--primary-color)
   * ```
   *
   * @param varname the css variable name
   * @returns a css var(..) function of a var
   */
  cssvar: <K extends CssVars<T>>(varname: K) => `var(--${K})`;
  /**
   * The css variables as a raw definition string.
   */
  definitions: T;
  /**
   * Cretes a css variable definition of the `varname` and `value` passed. The
   * resulting string can be used to overwrite or reassign a value to a css
   * variable already present in the `definitions` object. This is useful for
   * theming and defining media query specific values.
   *
   * @example
   * ```ts
   * const GlobalStyle = css`
   *   :root {
   *     ${definitions}
   *
   *     \@media screen and (min-width: 480px) {
   *       ${overwrite("gap", "1%")};
   *       ${overwrite("nav-width", 200)};
   *     }
   *   }
   * `;
   * ```
   *
   * @param varname the css variable name
   * @param value the new value to assign to the css variable
   * @returns a raw string of the css variable definition of the overwrite
   */
  overwrite: <K extends CssVars<T>, V extends string | number>(varname: K, value: V) => `--${K}: ${V};`;
}

/**
 * Creates a `CssVarContext` object with the passed css variable definitions.
 * This context contains the `cssvar(..)` function used to reference the css
 * variables in the context, the `overwrite(..)` function used to reassign the
 * value of css variables in the context, and the `definitions` value which is
 * the raw css variable definitions of the context.
 *
 * **Note:** The css variable must start with `--` for the type system to work.
 *
 * @example
 * ```ts
 * const { cssvar, definitions, overwrite } = makeCssVars(`
 *   --gap: 5%;
 *   --nav-width: 500;
 * `);
 *
 * const GlobalStyle = css`
 *   :root {
 *     ${definitions}
 *
 *     \@media screen and (min-width: 480px) {
 *       ${overwrite("gap", "1%")};
 *       ${overwrite("nav-width", 200)};
 *     }
 *   }
 *
 *   nav > .container {
 *     padding: ${cssvar("gap")};
 *     width: ${cssvar("nav-width")}px;
 *   }
 * `;
 * ```
 *
 * @param definitions a raw string including the css variable definitions
 * @returns a `CssVarContext` object for the defined css varibles
 *
 * @see {@link CssVarContext.cssvar cssvar(..)}
 * @see {@link CssVarContext.definitions definitions}
 * @see {@link CssVarContext.overwrite overwrite(..)}
 */
export function makeCssVars<T extends string>(definitions: T): CssVarContext<T> {
  return {
    cssvar: varname => `var(--${varname})`,
    definitions,
    overwrite: (varname, value) => `--${varname}: ${value};`,
  };
}
