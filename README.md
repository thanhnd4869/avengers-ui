# Avengers UI

A React 19 user interface built with JavaScript, Webpack 5, and Babel.

## Technology Stack

- React 19 and React DOM
- JavaScript and JSX
- Webpack 5 and Webpack Dev Server
- Babel 8
- CSS with `style-loader` and `css-loader`
- ESLint 9 with React and React Hooks rules
- Prettier
- Husky and lint-staged
- Commitlint with Conventional Commits

## Requirements

- Node.js 20.19.0 or later
- npm 10 or later

## Getting Started

1. Install dependencies:

   ```shell
   npm install
   ```

2. Create the local environment file:

   ```shell
   cp .env.example .env
   ```

   On Windows Command Prompt, use:

   ```bat
   copy .env.example .env
   ```

3. Start the development server:

   ```shell
   npm run dev
   ```

The application opens automatically at `http://localhost:3000` by default.

## Environment Variables

| Variable           | Default       | Description                                     |
| ------------------ | ------------- | ----------------------------------------------- |
| `WEBPACK_APP_NAME` | `Avengers UI` | Application name exposed to the browser bundle. |
| `HOST`             | `localhost`   | Webpack development server host.                |
| `PORT`             | `3000`        | Webpack development server port.                |

Only variables prefixed with `WEBPACK_` are exposed to browser code. `HOST` and `PORT` are used only by the Webpack configuration.

Do not store secrets in variables exposed to the browser bundle. Use `.env.local` or mode-specific local environment files for local overrides, and never commit sensitive values.

## Available Scripts

| Script                 | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Starts the development server with hot reloading.        |
| `npm run build`        | Creates an optimized production build in `build/`.       |
| `npm run lint`         | Checks the project with ESLint.                          |
| `npm run lint:fix`     | Fixes ESLint issues that can be corrected automatically. |
| `npm run format`       | Formats supported files with Prettier.                   |
| `npm run format:check` | Checks formatting without modifying files.               |
| `npm run lint:staged`  | Lints and formats staged files.                          |
| `npm run commitlint`   | Validates a commit message.                              |
| `npm run prepare`      | Initializes Husky Git hooks.                             |

All scripts are designed to run on Windows, macOS, and Linux.

## Code Conventions

- Use `.jsx` for files containing JSX or React UI components.
- Use `.js` for JavaScript files that do not contain JSX.
- Import across layers through their alias, and use a relative path only for
  files that sit in the same folder.
- ESLint runs during Webpack compilation. Lint errors fail the compilation and appear in the terminal and development overlay.
- Prettier handles code formatting.
- `react/prop-types` is disabled because React 19 removed runtime prop type
  checking, which makes `propTypes` declarations dead code.

## Git Hooks and Commit Messages

The pre-commit hook runs lint-staged:

- JavaScript and JSX files are fixed with ESLint and formatted with Prettier.
- JSON, Markdown, HTML, CSS, and YAML files are formatted with Prettier.

Commit messages must:

- Follow the Conventional Commits specification.
- Contain exactly one line.
- Use English ASCII characters only.

Examples:

```text
feat: add navigation component
fix(webpack): resolve development overlay issue
docs: update setup instructions
```

## Architecture

The project uses a **layer-based** architecture. Files are grouped by their
technical role, so each top-level folder under `src/` answers a single question:
what kind of code lives here?

| Folder        | Contains                                                            |
| ------------- | ------------------------------------------------------------------- |
| `components/` | Reusable presentational components shared across pages.             |
| `pages/`      | One component per screen. Composes components into a full view.     |
| `hooks/`      | Reusable custom React hooks.                                        |
| `services/`   | Communication with external systems, mainly HTTP requests.          |
| `utils/`      | Pure helper functions with no React or network dependency.          |
| `constants/`  | Shared constant values and configuration read from the environment. |

Folders that hold no code yet contain a `.gitkeep` file, because Git does not
track empty directories. Delete that file once the folder has real content.

### Conventions

- Every component and page lives in its own `PascalCase` folder, and the files
  inside repeat that name:

  ```text
  components/Layout/
  ├── Layout.jsx     the component
  ├── Layout.css     styles it owns
  └── index.js       public entry point
  ```

  Grouping this way keeps a component and everything it owns together, so adding
  a test or a sub-component later does not clutter the parent folder.

- `index.js` re-exports the component so it can be imported by folder name:

  ```js
  export { default } from "./Layout";
  ```

  This keeps import paths short and marks the folder boundary: anything not
  re-exported is internal and should not be imported from outside the folder.

- One component per file, using a default export.
- CSS class names follow the BEM pattern, scoped by the component name.
- Layers that hold plain modules, such as `hooks/` and `utils/`, keep their files
  flat because they have no companion files to group.
- `pages/` may import from every other folder. `components/`, `hooks/`,
  `services/`, `utils/`, and `constants/` must not import from `pages/`, which
  keeps reusable code free of screen-specific logic.

### Naming

Naming follows what a file exports: components are `PascalCase`, everything else
is `camelCase`.

| Layer         | Naming                        | Example                       |
| ------------- | ----------------------------- | ----------------------------- |
| `components/` | `PascalCase` folder and files | `Button/Button.jsx`           |
| `pages/`      | `PascalCase`, `Page` suffix   | `HomePage/HomePage.jsx`       |
| `hooks/`      | `camelCase`, `use` prefix     | `useAuth.js`                  |
| `services/`   | `camelCase`                   | `authService.js`              |
| `utils/`      | `camelCase`                   | `formatDate.js`               |
| `constants/`  | `camelCase` file              | `app.js` exporting `APP_NAME` |

The `use` prefix on hooks is required rather than cosmetic: React and
`eslint-plugin-react-hooks` rely on it to detect hooks and apply the Rules of
Hooks. Constant files are named like any other module, and only the exported
values use `UPPER_SNAKE_CASE`.

### Path Aliases

Each layer has an import alias, so modules are referenced by their layer instead
of by a relative path such as `../../components/Layout`.

| Alias          | Resolves to       |
| -------------- | ----------------- |
| `@components/` | `src/components/` |
| `@constants/`  | `src/constants/`  |
| `@hooks/`      | `src/hooks/`      |
| `@pages/`      | `src/pages/`      |
| `@services/`   | `src/services/`   |
| `@utils/`      | `src/utils/`      |

```jsx
import Layout from "@components/Layout";
import { APP_NAME } from "@constants/app";
```

A component is imported by its folder name because the `index.js` inside that
folder re-exports it. Importing the inner file directly, such as
`@components/Layout/Layout`, also works but bypasses the folder's public entry
point and should be avoided.

Aliases are declared in two files that must be kept in sync: `resolve.alias` in
`webpack.config.js` resolves them during bundling, and `paths` in
`jsconfig.json` enables editor navigation and autocompletion. Adding a new layer
means adding it to both files.

A stylesheet is still imported with a relative path (`./HomePage.css`) because it
sits next to the component that owns it.

An alias that points at a missing module fails the Webpack build with
`Module not found`. ESLint does not verify import paths, so a broken import is
reported at build time rather than by `npm run lint`.

## Project Structure

```text
avengers-ui/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── index.js
│   │       ├── Layout.css
│   │       └── Layout.jsx
│   ├── constants/
│   │   └── app.js
│   ├── hooks/
│   │   └── .gitkeep
│   ├── pages/
│   │   └── HomePage/
│   │       ├── HomePage.css
│   │       ├── HomePage.jsx
│   │       └── index.js
│   ├── services/
│   │   └── .gitkeep
│   ├── utils/
│   │   └── .gitkeep
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
├── .env.example
├── .babelrc
├── commitlint.config.js
├── eslint.config.js
├── jsconfig.json
├── lint-staged.config.js
├── package.json
└── webpack.config.js
```

## Production Build

Create an optimized build:

```shell
npm run build
```

Webpack writes the output to `build/`, cleans stale files, generates source maps, and uses content-hashed JavaScript filenames for long-term caching.
