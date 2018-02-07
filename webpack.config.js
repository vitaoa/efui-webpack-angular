/**
 * Created by vita on 2018/1/29.
 */
'use strict';


const path = require("path");

//路径定义
var publicPath = '/';


module.exports = {
    //基础目录，入口起点（entry）会相对于此目录查找
    context: path.resolve(__dirname,'app/scripts'),
    //入口文件配置
    entry: {
        "app": "./ev-app.js"
    },
    //文件导出的配置
    output:{
        path:path.resolve(__dirname,'app'), //用来存放打包后文件的输出目录
        publicPath: publicPath,
        filename:'bundle.js'
    },
    resolve: {//解析模块请求的选项（不适用于对 loader 解析）
        alias: {//创建 import 或 require 的别名
            jquery: path.resolve(__dirname, 'app/bower_components/jquery/dist/jquery'),
            angular: path.resolve(__dirname, 'app/bower_components/angular/angular'),
            angularUiRouter: path.resolve(__dirname, 'app/bower_components/angular-ui-router/release/angular-ui-router'),

            appRoutes: path.resolve(__dirname, 'app/scripts/ev-app.routes')
        }
    },
    externals: {//防止将某些 import 的包打包到 bundle 中
        //"jquery": "window.$"
    },
    // 使用loader转换器
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.s[c,a]ss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]' //将css中用到的字体全部提取存放到fonts目录下，fonts目录是相对output.path目录而言的
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8*1024, // 图片大小限制 单位b
                    name: '[path][name].[ext]' // 生成的文件的存放目录
                }
            },
        ]
    },
}