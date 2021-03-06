const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: [/\.vert$/, /\.frag$/],
        use: require.resolve('raw-loader'),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  targets: {
                    node: 'current',
                  },
                },
              ],

            ],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'index.html'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'assets', '**', '*'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(false),
    }),
  ],
};