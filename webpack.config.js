const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack uses this to work with directories
const path = require("path");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  entry: {
    app: "./src/js/entry.js",
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "",
    filename: 'assets/js/bundle.js'
  },

  devtool: "source-map",

  devServer: {
    // devMiddleware: {
    //   writeToDisk: true
    // },
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.(sass)$/,
        use: [
          {
            // inject CSS to page
            loader: "style-loader",
          },
          {
            // After all CSS loaders, we use a plugin to do its work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            // translates CSS into CommonJS modules
            loader: "css-loader",
            options: { sourceMap: true, url: false },
          },
          {
            // Run postcss actions
            loader: "postcss-loader",
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/styles.css",
    }),
  ],

  mode: "development",
};
