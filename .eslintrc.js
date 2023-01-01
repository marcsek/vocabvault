module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname + '/apps',
  },
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
};
