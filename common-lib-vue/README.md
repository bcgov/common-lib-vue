# common-lib-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e
```

Normally in projects that use Cypress with Vite, commands like `npm run test:e2e:dev` would allow you to run e2e tests against a developer as opposed to production build. In this library, the e2e tests are configured in the package.json to run with storybook, which handles the server hosting and mounting of components. `npm run test:e2e` will do all of that for you.

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Other important notes

This library requires a minimum of Node 22. This is because the PDFJS library we use for the FileUploader component uses the [Promise.withResolvers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers#browser_compatibility) method in it.
