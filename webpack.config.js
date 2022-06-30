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

  const webSocketHost = process.env.WEBPACK_WEBSOCKET_HOST || "localhost";
  const webSocketPort = process.env.WEBPACK_WEBSOCKET_PORT || undefined;
  const webSocketProtocol = process.env.WEBPACK_WEBSOCKET_PROTOCOL || "ws";

  const config = mergeRulesWithMatchingTest(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            { loader: require.resolve("style-loader") },
            {
              loader: require.resolve("css-loader"),
              options: { modules: true },
            },
          ],
        },
      ],
    },
    devServer: {
      ...defaultConfig.devServer,
      open: false,
      hot: true,
      client: {
        webSocketURL: {
          hostname: webSocketHost,
          port: webSocketPort,
          protocol: webSocketProtocol,
        },
      },
    },
  });

  return config;
  // return merge(defaultConfig, {
  //   // modify the webpack config however you'd like to by adding to this object
  // });
};
