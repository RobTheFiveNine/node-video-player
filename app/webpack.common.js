const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    proxy: {
      '/videos.json': {
        target: 'http://localhost:3000/',
      },
      '/videos/': {
        target: 'http://localhost:3000/',
      },
    },
    historyApiFallback: true,
  },
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.resolve('../build'),
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'vendor', to: 'vendor' },
        {
          from: '../node_modules/bootstrap/dist',
          to: 'vendor/bootstrap',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      title: 'Node Video Player',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(css)$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
