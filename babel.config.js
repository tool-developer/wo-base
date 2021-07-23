module.exports = {
  presets: [
    ['@babel/preset-env', {
      "targets": {
        "safari": 9,
        "ios": 9,
        "edge": 11
      }
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"]
  ],
};