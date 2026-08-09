module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "single-line-ascii": ({ raw }) => {
          const message = raw.trim();
          const isValid = /^[\x20-\x7E]+$/.test(message);

          return [isValid, "commit message must contain one line using English ASCII characters"];
        }
      }
    }
  ],
  rules: {
    "single-line-ascii": [2, "always"]
  }
};
