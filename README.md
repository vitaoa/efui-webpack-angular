# efui - Web

Mobile-friendly Angular based web app for the efui Platform

Requires ```node```


### webpack构建配置
1. **jQuery引入**
    
    11. 直接在 html 中引入
        
        > &lt;script src="bower_components/jquery/dist/jquery.js">&lt;/script>
        
          需要 import 或 require 进来的话，就在 externals 中把它配置为全局，不会打包。（目测不需要用？）
        > externals: {
              jquery: 'window.$'
          }
          
        > import $ from 'jquery';
          var $ = require('jquery');

    11. 通过 resolve.alias 来创建 import 或 require 的别名
    
        > resolve: {
            alias: {
                jquery: path.resolve(__dirname, 'app/bower_components/jquery/dist/jquery')
            }
        }
        
          使用则直接 import 或 require 进来。
        > import $ from 'jquery';
          var $ = require('jquery');

1. **angular引入**
    
    11. 直接在 html 中引入
        
        > &lt;script src="bower_components/angular/angular.js">&lt;/script>
        
    11. 通过 resolve.alias 来创建 import 或 require 的别名
    
        > resolve: {
            alias: {
                angular: path.resolve(__dirname, 'app/bower_components/angular/angular')
            }
        }
        
          使用则直接 import 或 require 进来。
        > require('angular');
        
    11. 版本注意
        ```
        Angular 1.6 版本更新后，使用ng-route大于1.6.0的版本时，地址中的 "/" 会自动被解析，而且还会在URL地址中加入#！。
        在配置路由时添加如下代码即可：$locationProvider.hashPrefix('');
        ```
        
1. **配置使用ui-router**
    
    11. 直接在 html 中引入（也可以通过别名引入，同angular）
        
        > &lt;script src="bower_components/angular-ui-router/release/angular-ui-router.js">&lt;/script>
        
    11. 定义视图
    
        > &lt;div ui-view>&lt;/div>
        
    11. 配置路由状态
    
          ```
          .config(["$stateProvider","$urlRouterProvider", function ($stateProvider,$urlRouterProvider){
                $urlRouterProvider.otherwise('/');
                $stateProvider
                    .state("index", { //导航用的名字，如<a ui-sref="login">login</a>里的login
                        url: '/',    //访问路径
                        templateUrl: "partials/common/main.html",
                        controller: function($scope, $location) {
                            $scope.docsTit = "Easy Fast UI Frame";
                            $scope.docsMsg = "EFUI为一款轻量级前端UI框架，通俗易懂的写法及模块式的拼装方便自由扩展，简单易用，轻量快捷。";
                        }
                    })
          }])
          ```
          
1. **相关的命令参数**

    每次修改完文件进行编译时都需要写命令，很是繁琐，在命令最后加上--watch，当文件有变化时，就会自动编译：webpack --watch。
    
    在webpack执行命令之后可以添加一些参数，这些参数都有自己的作用，下面是参数列表：
    ````
    --watch //监听变动并自动打包
    --progress //当前打包的进度条
    --display-modules：打包的模块，依赖什么而打包也会列出来
    --display-reasons：打包模块的原因，因为什么打包
    --color //添加颜色
    -p //压缩混淆脚本，容易报错
    -d //生成map映射文件，告知哪些模块被最终打包到哪里了其中的
    ````

1. **loader转换器**

    Webpack本身只能处理JavaScript模块，如果要处理其他类型的文件，就需要使用loader进行转换。
    通过loader可以支持各种语言和预处理器编写模块，包括：                                        
    ```
    CoffeeScript
    TypeScript
    ESNext (Babel)
    Sass
    Less
    Stylus
    ```
    
    loader描述了webpack如何处理非JavaScript(non-JavaScript)模块，并且在bundle中引入这些依赖；
        
    例如：在require引入style.css文件时，就需要css-loader转换，require('style-loader!css-loader!./style.css')或者{test: /\.css$/,loader: 'style-loader!css-loader'}；
    
    css-loader是允许webpack识别.css的文件，style-loader是将webpack识别完的css文件中的内容，在编译完运行文件的时候，将这些css用style标签包起来嵌在head内。

    11. loader的三种用法：
    
        1. require()        
        2. 在配置文件webpack.config.js中通过module.loaders进行配置        
        3. 在命令行中配置：可以通过--module-bind把Loader绑定到扩展名上，webpack --module-bind 'css=style-loader!css-loader'
        
    11. loader的参数
        
        loader可以传入query字符作为参数（像浏览器中那样），query字符串跟在 Loader后面。
        
        例如 `test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,file-loader?name=fonts/[name].[ext]`。
         
        或者：
        `{
            test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,
            loader: "file-loader",
            query: { name: '[name][hash].[ext]' }
        }`
        
    11. 处理样式文件

        ```
        处理普通的.css 文件，需要安装 css-loader style-loader
        .less 文件，需要安装 less-loader
        .sass 文件，需安装  sass-loader
        ```
        
        ```
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
        ```
            
    11. 处理样式中的woff等字体文件
    
        ````
        添加一个url-loader，处理字体、图片之类的文件；
        url-loader和file-loader 都是用于打包文件和图片，一般限制小图片转 base64 可以用 url-loader，其他情况都用 file-loader；
        url-loader应该是在file-loader基础上加了一层过滤。
        ````
        
        ```
        {
            test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'  //将css中用到的字体全部提取存放到fonts目录下，fonts目录是相对output.path目录而言的
        }
        ```