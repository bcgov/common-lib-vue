# BCGov Vue Common Library

[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/common-lib-vue)

Storybook documentation: https://bcgov.github.io/common-lib-vue/

## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Start and launch Storybook
```
npm run storybook
```

### Formatting

Formatting for vue files is mostly handled through eslint, since relying on prettier could conflict with eslint rules. 
See `.vscode` for recommended extensions, you may need to restart after installing them. Note that in `.vscode/settings.json` 
the configuration
``` json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

will override your default rules and needs to be set to false if you do not want to run eslint on save.
For the full list of vue-3 specific rules, see [here](https://eslint.vuejs.org/rules/)