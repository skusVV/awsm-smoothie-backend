const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production', // Add this line
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2' // Add this line to handle module exports correctly
  },
  target: 'node',
};