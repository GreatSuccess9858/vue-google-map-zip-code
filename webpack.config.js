require('dotenv').config();

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: {
      index: './src/index.js',
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    devServer: {
      watchOptions: {
        poll: true
      },
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
  },
  {
    entry: {
      zipcode: './src/Zipcode.vue',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'Zipcode',
      libraryTarget: 'umd',
    },
  }
];
