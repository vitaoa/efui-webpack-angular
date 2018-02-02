/**
 * Created by vita on 2018/1/29.
 */

const path = require("path");


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
        filename:'bundle.js'
    },
    externals: {//防止将某些 import 的包打包到 bundle 中
        //"jquery": "window.$"
    },
}