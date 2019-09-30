// dev-server.js
var path = require('path');
var express = require('express');
var utils = require('./utils');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');

// Express实例
var app = express();

// 获取页面目录
var entries = utils.entries;
console.log({ entries });

// entry中添加HotUpdate地址
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

// 重置入口entry
webpackConfig.entry = {};
webpackConfig.plugins = webpackConfig.plugins || [];
// 设置output为每个页面[name].js
webpackConfig.output.filename = '[name].js';
webpackConfig.output.path = path.join(__dirname, 'dist');
webpackConfig.output.publicPath = '/';

Object.keys(entries).forEach(function(name) {
  // 每个页面生成一个entry
  // 这里修改entry实现HotUpdate
  webpackConfig.entry[name] = [
    'babel-polyfill',
    entries[name],
    hotMiddlewareScript
  ];

  // 每个页面生成一个[name].html
  var plugin = new HtmlWebpackPlugin({
    // 生成出来的html文件名
    filename: name + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: './index.html',
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: [name]
  });
  webpackConfig.plugins.push(plugin);
});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.devtool = 'eval-cheap-module-source-map';

// webpack编译器
var compiler = webpack(webpackConfig);

// webpack-dev-server中间件
app.use(
  WebpackDevMiddleware(compiler, {
    publicPath: 'http://localhost:8080/',
    stats: {
      colors: true,
      chunks: false
    },
    progress: true,
    inline: true,
    hot: true
  })
);

app.use(WebpackHotMiddleware(compiler));

// 路由
app.get('/:pagename?', manageRequest);
app.get('/:pagename?/*', manageRequest);

function manageRequest(req, res, next) {
  const keys = Object.keys(entries);
  let name = req.params.pagename;
  if (keys.length && keys.indexOf(name) == -1) {
    res.redirect('./' + keys[0]);
    return;
  }
  var pagename = name ? name + '.html' : 'index.html';

  var filepath = path.join(compiler.outputPath, pagename);

  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function(err, result) {
    if (err) {
      // something error
      return next(
        '输入路径无效，请输入目录名作为路径，有效路径有：\n/' +
          Object.keys(entries).join('\n/')
      );
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
}

module.exports = app.listen(8080, function(err) {
  if (err) {
    // do something
    return;
  }

  console.log('Listening at http://localhost:8080\n');
});
