const mix = require('laravel-mix')
require("vuetifyjs-mix-extension");
require("laravel-mix-clean");
let path = require('path');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js").vue();
mix.sass("resources/styles/app.scss", "public/css")

if (mix.inProduction()) {
  mix.version();

  mix.webpackConfig({
    output: {
      chunkFilename: "js/chunks/[name].[contenthash].js", // replace with your path
    },
  });
} else {
  mix.webpackConfig({
    output: {
      chunkFilename: "js/chunks/[name].js", // replace with your path
    },
  });
}

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js'),
      '$comp': path.join(__dirname, './resources/js/components')
    }
  },
  plugins: [
    new VuetifyLoaderPlugin()
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(bower_components)/,
      use: [{
        loader: 'babel-loader',
        //options: mix.config.babel()
      }]
    }]
  }
})

mix.browserSync(process.env.APP_URL)
