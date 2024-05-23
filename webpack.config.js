const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development'; // если  node-env не определена то будет development
const devMode = mode === 'development'; // проверка является ли  двелоп версией
const target = devMode ? 'web' : 'browserslist'; // если  devmode то  под web иначе под какой браузер
const devtool = devMode ? 'source-map' : undefined
module.exports = {
  mode,
  target,
  devtool,
  devServer: { // не работает  на  node 14.18.3
    port: 8080,
    open: true, // автоматически откроет сайт
    hot: true, 
  },
  
  entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')], // от куда берем файл
  output: {
    path: path.resolve(__dirname, 'dist'), // куда складываем
    clean: true, // удаляем старые файлы из папки
    filename: '[name].[contenthash].js', //как называем новый файл
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: path.resolve(__dirname, 'src', 'index.html') //показываем файл с которым будет работать  плагин
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  
  ],
  module: {
    rules: [
      {
        test: /\.html$/i, //название файла
        loader: 'html-loader', // устанавливаем автообновление
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" :MiniCssExtractPlugin.loader,
         "css-loader",
         {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('postcss-preset-env')]
            }
          }
         },
         'sass-loader'],
      },

      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
     
    ]
  }
}