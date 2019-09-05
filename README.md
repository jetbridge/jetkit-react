# JetKit

JetKit is a set of components and libraries for building web and mobile applications that work together to accelerate
development and share common components without a lot of copy-pasting of code.

This package is for React and TypeScript projects.

## Hacking

It is suggested to use the project and storybook from the [component-library](component-library) directory to mock and develop components against.

```
cd component-library
yarn storybook
```

## Publishing Package

1. (Authenticate to GitHub package registry)[https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry]. You may need to generate an auth token to use as your password if using 2FA.
2. `npm publish`
