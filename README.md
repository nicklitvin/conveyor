# Conveyor

Conveyor is a comprehensive React UI library for quickly building UI components to interact with GraphQL APIs generated by the [Magql](https://github.com/autoinvent/magql) library. It provides an intuitive and user-friendly interface for performing CRUD (Create, Read, Update, Delete) operations on your GraphQL data.

## Usages
Both a UMD module and ES module exist, allowing Conveyor to be used either as an npm package with the command:
```bash
pnpm install @autoinvent/conveyor
```
```jsx
import Conveyor from '@autoinvent/conveyor'
```
or via a CDN with the following link tag:
```html
  <link crossorigin href="https://unpkg.com/@autoinvent/conveyor@2.0.0" rel="stylesheet" />

```

**Note**: React is not used in the final bundle and needs to be installed separately.  


## Scripts

- `pnpm build` - Build library for production; The generated files will be on the `dist` folder. 
- `pnpm build:css` - Run tailwind CLI tool to build the css file.
- `pnpm storybook` - run storybook
- `pnpm format` - Format all files with Biome.
- `pnpm lint` - Scan all files for linting errors with Biome.

## Useful commands
- `pnpm pack` will package the files from `pnpm build` into a tarball for install.
