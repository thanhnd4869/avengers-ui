const path = require("path");
const { existsSync } = require("fs");
const { loadEnvFile } = require("process");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const envPath = path.resolve(__dirname, ".env");

if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const devServerHost = process.env.HOST || "localhost";
  const devServerPort = Number.parseInt(process.env.PORT ?? "3000", 10);

  return {
    dotenv: {
      prefix: "WEBPACK_",
    },
    entry: path.resolve(__dirname, "src/index.jsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/[name].js",
      clean: true,
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      host: devServerHost,
      port: Number.isInteger(devServerPort) ? devServerPort : 3000,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          type: "javascript/auto",
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        context: path.resolve(__dirname, "src"),
        extensions: ["js", "jsx"],
        emitError: true,
        emitWarning: true,
        failOnError: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
    ],
    performance: {
      hints: isProduction ? "warning" : false,
    },
  };
};
