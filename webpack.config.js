const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

const mergeRulesWithMatchingTest = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: {
        loader: "match",
        options: "replace",
      },
    },
  },
});

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "olympus",
    projectName: "theseus",
    webpackConfigEnv,
    argv,
  });


  const config = mergeRulesWithMatchingTest(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            { loader: require.resolve("style-loader") },
            { loader: require.resolve("css-loader"), options: { modules: true } },
          ],
        },
      ],
    },
  });

  return config;
  // return merge(defaultConfig, {
  //   // modify the webpack config however you'd like to by adding to this object
  // });
};
