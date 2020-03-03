[![CircleCI](https://circleci.com/gh/jetbridge/jetkit-react.svg?style=svg)](https://circleci.com/gh/jetbridge/jetkit-react)

# JetKit 🚀

JetKit is a set of components and libraries for building web and mobile applications that work together to accelerate
development and share common components without a lot of copy-pasting of code.

This package is for React and TypeScript projects.

# Configuration

## API Client

To configure your project to use an API client that is compatible with a JetKit backend server, create a `.env` file with the contents:

```
REACT_APP_BASE_URL=http://localhost:5000/api
```

## Hacking

It is suggested to use the project and storybook from the [component-library](component-library) directory to mock and develop components against.

```
cd component-library
npm run storybook
```
