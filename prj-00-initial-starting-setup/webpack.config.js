const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
