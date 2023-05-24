const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: '.src/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client'),
  },
  optimization: {
    usedExports: true,
  },
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './src/client'),
      publicPath: '/',
    },
    port: 8080,
    hot: true,
    proxy: {},
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html',
    }),
  ],
};
