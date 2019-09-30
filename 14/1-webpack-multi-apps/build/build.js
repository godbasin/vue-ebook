process.env.NODE_ENV = "production";

var ora = require("ora");
var rm = require("rimraf");
var path = require("path");
var utils = require("./utils");
var chalk = require("chalk");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
var config = require("../config");

// 获取本来的配置的副本
var plugins = webpackConfig.plugins || [];

var entries = utils.entries;
var pageArray;

var useSourceMap = true;
webpackConfig.devtool = useSourceMap ? 'source-map' : false;

// 取掉前两个参数，分别为node和build
process.argv.splice(0, 2);

if (process.argv.length) {
  // 若传入页面参数，则单页面打包
  pageArray = process.argv;
} else {
  // 若无传入页面参数，则全块打包
  pageArray = Object.keys(entries);
  console.log(pageArray);
}

// 开始输出loading状态
var spinner = ora('building for production...');
spinner.start();

pageArray.forEach(function(val, index, array) {
  rm(path.join(__dirname, '..', 'dist', val), err => {
    if (err) throw err;
    // print pageName[]
    console.log(index + ': ' + val);
    webpackConfig.devtool = '#source-map';
    webpackConfig.output = Object.assign({}, webpackConfig.output);
    webpackConfig.output.path = path.join(__dirname, '..', 'dist', val);
    // 需要将资源发到cdn或某些位置
    // webpackConfig.output.publicPath = '//your/public/path/' + val + '/'
    // 输出目录dist/pageName
    webpackConfig.output.filename = utils.assetsPath('js/[name].[chunkhash].js');
    webpackConfig.output.chunkFilename = utils.assetsPath('js/[id].[chunkhash].js');
    webpackConfig.output.path = path.join(__dirname, '..', 'dist', val);
    // 入口文件设定为指定页面的入口文件
    // main.js这里为通用入口文件
    webpackConfig.entry = {};
    webpackConfig.entry[index] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      val,
      'main.js'
    );
    // 添加index.html主文件
    webpackConfig.plugins = [
      new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: 'index.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './index.html',
        // 或使用单独的模版
        // template: './src/' + val + '/index.html',
        // 自动将引用插入html
        inject: true
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        // chunks: [name]
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(__dirname, '../node_modules')) ===
              0
          );
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }),
      // copy custom static assets
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(__dirname, '../static'),
      //     to: config.build.assetsSubDirectory,
      //     ignore: ['.*']
      //   }
      // ]),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      })
    ].concat(plugins);
    // 开启打包
    webpack(webpackConfig, function(err, stats) {
      spinner.stop();

      // 输出错误信息
      if (err) throw err;

      // 输出打包完成信息
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      );

      console.log(chalk.cyan('  Build complete: ' + val + '\n'));
    });
  });
});
