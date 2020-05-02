module.exports = {
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/jsx-one-expression-per-line": ["off"]
  },
  "env": {
    "browser": true,
    "node": true,
  },
};