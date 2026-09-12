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
- ESLint runs during Webpack compilation. Lint errors fail the compilation and appear in the terminal and development overlay.
- Prettier handles code formatting.

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

## Project Structure

```text
avengers-ui/
├── public/
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
├── .env.example
├── .babelrc
├── commitlint.config.js
├── eslint.config.js
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
