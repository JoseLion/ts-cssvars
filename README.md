[![CI](https://github.com/JoseLion/ts-cssvars/actions/workflows/ci.yml/badge.svg)](https://github.com/JoseLion/ts-cssvars/actions/workflows/ci.yml)
[![CodeQL](https://github.com/JoseLion/ts-cssvars/actions/workflows/codeql.yml/badge.svg)](https://github.com/JoseLion/ts-cssvars/actions/workflows/codeql.yml)
[![Pages](https://github.com/JoseLion/ts-cssvars/actions/workflows/pages.yml/badge.svg)](https://github.com/JoseLion/ts-cssvars/actions/workflows/pages.yml)
[![Release](https://github.com/JoseLion/ts-cssvars/actions/workflows/release.yml/badge.svg)](https://github.com/JoseLion/ts-cssvars/actions/workflows/release.yml)
[![NPM version](https://img.shields.io/npm/v/ts-cssvars?logo=npm)](https://www.npmjs.com/package/ts-cssvars)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/ts-cssvars)](https://www.npmjs.com/package/ts-cssvars)
[![NPM downloads](https://img.shields.io/npm/dm/ts-cssvars)](https://www.npmjs.com/package/ts-cssvars)
[![NPM license](https://img.shields.io/npm/l/ts-cssvars)](./LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/JoseLion/ts-cssvars)](https://github.com/JoseLion/ts-cssvars/releases)
[![Known Vulnerabilities](https://snyk.io/test/github/JoseLion/ts-cssvars/badge.svg)](https://snyk.io/test/github/JoseLion/ts-cssvars)

# TS CSSVars

A type-safe way to define and use CSS variables in JS/TS context. With `ts-cssvars` you will not only forget about typos, but it also allows you to modularize and centralize your CSS variables. It's perfect for using with CSS-in-JS libraries like [Styled Components](https://styled-components.com/) and [Emotion](https://emotion.sh/docs/introduction).

## Install

**With Yarn:**

```sh
yarn add ts-cssvars
```

**With NPM:**

```sh
npm i ts-cssvars
```

## Usage

Using TS CssVars is very simple. The API contains the following:

- [makeCssVars](#makecssvars)
- [mergeCssVars](#mergecssvars)

You can also check the complete [📚 API Reference](https://joselion.github.io/ts-cssvars/docs/build/) for more details and documentation on all the type definitions.

### makeCssVars

With this function you can creates a `CssVarContext` object from a raw css variable definitions string. This context contains the `cssvar(..)` function used to reference the css variables from the context, the `overwrite(..)` function used to reassign the value of css variables in the context, and the `definitions` value which is the raw css variable definitions of the context. Keep in mind that the css variable must start with `--` for the type system to work as expected.

```ts
const { cssvar, definitions, overwrite } = makeCssVars(`
  --gap: 5%;
  --nav-width: 500;
`);

const GlobalStyle = css`
  :root {
    ${definitions}

    @media screen and (min-width: 480px) {
      ${overwrite("gap", "1%")};
      ${overwrite("nav-width", 200)};
    }
  }

  nav > .container {
    padding: ${cssvar("gap")};
    width: ${cssvar("nav-width")}px;
  }
`;
```

In the example above, the `cssvar(..)` function arguments are typesafe, so trying to access a non-existing css variable will cause a compile time error:

```ts
cssvar("foo");
//     ^ Argument of type '"foo"' is not assignable to parameter of type '"gap" | "nav-width"'
```

Under the hood, the functions create raw strings that you can use on CSS to define and reference css variables:

```ts
cssvar("gap"); // var(--gap)
cssvar("nav-width"); // var(--nav-width)

overwrite("gap", "1%"); // --gap: 1%;
overwrite("nav-width", 500); // --nav-width: 500;

console.log(definitions);
// Output:
//   --gap: 5%;
//   --nav-width: 500;
``` 

### mergeCssVars

You will usially want to create different `CssVarContext` object so you can modularize the variables. For example, you can create a context for your header, another for the foother, navigation, etc. Doing that will let you organize variables in a better way, and even use only the variables you need on specific files. But for some other cases you may want to use all the variables you creted in a single context.

The `mergeCssVars(..)` function allows you to merge two or more `CssVarContext` object into a single context. You may find this mostly usefull when theming, making things responsive, and when your global css variables are too big to handle on a single place (modularizing).

```ts
export const baseCssVars = makeCssVars(`
  --primary-color: red;
  --secondary-color: blue;
`);

 export const navCssVars = makeCssVars(`
  --gap: 5%;
  --nav-width: 500;
`);

export const mainCssVars = mergeCssVars(baseCssVars, navCssVars);

const { cssvar, definitions, overwrite } = mainCssVars;

const const GlobalStyle = css`
  :root {
    ${definitions}

    @media screen and (min-width: 480px) {
      ${overwrite("gap", "1%")};
      ${overwrite("nav-width", 200)};
    }
  }

  nav > .container {
    color: ${cssvar("primary-color")};
    padding: ${cssvar("gap")};
    width: ${cssvar("nav-width")}px;
  }
`;
```

## Something's missing?

Suggestions are always welcome! Please create an [issue](https://github.com/JoseLion/ts-cssvars/issues/new) describing the request, feature, or bug. I'll try to look into it as soon as possible 🙂

## Contributions

Contributions are very welcome! To do so, please fork this repository and open a Pull Request against the `main` branch.

## License

[MIT License](./LICENSE)
