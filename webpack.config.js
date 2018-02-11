/**
 * Created by vita on 2018/1/29.
 */
'use strict';


const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',// creates style nodes from JS strings
                    use: [
                        {loader:'css-loader'},
                        {
                            loader:'sass-loader',
                            options: {
                                outputStyle : 'compact' //输出css的格式两个常用选项:compact({}行), compressed(压缩一行)
                            }
                        }
                    ]
                }),
            },
            {
                test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    publicPath:'./', //设置路径是相对output.path的
                    outputPath:'fonts/', //将css中用到的字体全部提取存放到fonts目录下
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    publicPath:'./', //设置路径是相对output.path的
                    outputPath:'images/', //将css中用到的超过限制的图片全部提取存放到images目录下
                    limit: 6*1024, // 图片大小限制 单位b
                    name: '[name].[ext]' // 生成的文件的存放目录
                }
            },
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({ // 所有js文件中通过require引入的css都会被打包成相应文件名字的css
            filename: "[name].css",
            allChunks: true
        })
    ],
    //对webpack-dev-server进行配置
    devServer:{
        contentBase:"./app/", // 本地服务器在哪个目录搭建页面
        inline:true, // 用来支持webpack-dev-server自动刷新的配置
        hot:true, // 启动webpack热模块替换特性
        port:8888 //端口号(默认8080)
    }
}