const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './src/client'),
  },
  optimization: {
    usedExports: true,
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './src/client'),
      publicPath: '/',
    },
    port: 8080,
    hot: true,
    proxy: {
      '/oauth/*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/client/index.html',
    }),
  ],
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './src/client/index.tsx',
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, './src/client'),
//   },
//   optimization: {
//     usedExports: true,
//   },
//   mode: process.env.NODE_ENV || 'development',
//   devServer: {
//     // historyApiFallback: true,
//     static: {
//       directory: path.join(__dirname, './src/client'),
//       publicPath: '/',
//     },
//     // port: 8080,
//     hot: true,
//     proxy: {
//       '/oauth': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//       },
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Development',
//       template: './src/client/index.html',
//     }),
//   ],
// };
