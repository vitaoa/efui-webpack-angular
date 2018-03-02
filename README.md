# efui - Web

Mobile-friendly Angular based web app for the efui Platform

Requires ```node```


### webpack构建配置
1. **jQuery引入**
    
    11. 直接在 html 中引入
        
        > &lt;script src="bower_components/jquery/dist/jquery.js">&lt;/script>
        
          需要 import 或 require 进来的话，就在 externals 中把它配置为全局，不会打包。（**必须在html页面里面添加**）
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

1. **ProvidePlugin**

    使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入，使用语法：
    ````
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
    ````

        
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

    Webpack本身只能处理JavaScript模块，如果要处理其他类型的文件，就需要使用loader进行转换，**并自动生成处理后的文件**。
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
        ```
        {
            test: /\.(woff2?|svg|eot|ttf|otf)(\?.*)?$/,
            loader: "file-loader",
            query: {
                publicPath:'./', //设置路径是相对output.path的
                outputPath:'fonts/', //将css中用到的字体全部提取存放到fonts目录下
                name: '[name].[ext]'
            }
        }
        ```
        
    11. 处理样式文件

        ```
        处理普通的.css 文件，需要安装 css-loader style-loader
        .less 文件，需要安装 less-loader
        .sass 文件，需安装  sass-loader
        ```
        
        SASS提供四个编译风格的选项：        
        * nested：嵌套缩进的css代码，它是默认值。            
        * expanded：没有缩进的、扩展的css代码。            
        * compact：简洁格式的css代码。            
        * compressed：压缩后的css代码。
             
        ```
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.s[c,a]ss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=compact'
            },
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
            loader: 'file-loader?name=fonts/[name].[ext]'
        }
        ```
            
    11. 处理小图片转换成base64,大图片自动转换成网络路径
        
        ````        
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
        ````
        
1. **webpack-dev-server配置**

    每次修改文件，是将文件打包保存在内存中并没有写在磁盘里，这种打包得到的文件和项目根目录中的index.html位于同一级
   
    11. 通过devServer对webpack-dev-server进行配置：
   
        ````
        devServer:{
            contentBase:"./app/", // 本地服务器在哪个目录搭建页面，项目根目录中的index.html目录
            inline:true, // 用来支持webpack-dev-server自动刷新的配置
            hot:true, // 启动webpack热模块替换特性
            port:8080 //端口号(默认8080)
        } 
        ````
    11. 为了方便，可以直接在packjson中对webpack-dev-server的启动进行设置：
   
        ````
        "dev": "webpack-dev-server --inline"
        ````
    11. 填坑：
   
        使用webpack-dev-server时，开启了inline和hot，但是热更新无效，原因是，没有引入这个插件HotModuleReplacementPlugin，需要如下声明：
        new webpack.HotModuleReplacementPlugin();
       
        ````
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
        ]
        ````

1. **extract-text-webpack-plugin配置**

    使用extract-text-webpack-plugin插件将css单独打包成一个文件。**webpack-dev-server热替换时，对extract-text-webpack-plugin抽离的css无效，建议开发环境下不用**
    
    ````
    const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
    new ExtractTextPlugin({ // 所有js文件中通过require引入的css都会被打包成相应文件名字的css
        filename: "[name].css",
        allChunks: true
    })
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
    ````

1. **构建生产和开发环境分离**

    通过npm scripts设置是否开发环境（development）：
    * 安装cross-env：npm install cross-env --save-dev；
    * 在NODE_ENV=xxxxxxx前面添加cross-env就可以了，通过process.env.NODE_ENV来访问。
    
    开发模式下：不使用extract-text-webpack-plugin插件。用到了以下插件：
    ````
    webpack-dev-server
    ````
    
    生产模式下：主要涉及导出目录、代码混淆、去除冗余代码等相关配置。用到了以下插件：
    ````
    DefinePlugin：定义环境变量
    webpack.LoaderOptionsPlugin：去除调试代码，压缩代码
    webpack.optimize.UglifyJsPlugin：针对JS的混淆配置
    CopyWebpackPlugin：复制手动引入的资源文件到指定目录
    ````

1. **html-webpack-plugin配置**

    ````
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    plugins: [new HtmlWebpackPlugin()]
    ````

1. **copy-webpack-plugin配置**

    ````
    const CopyWebpackPlugin = require('copy-webpack-plugin');    
    new CopyWebpackPlugin([{
        from: __dirname + '/app/partials',
        to: __dirname + '/dist/partials'
    }])
    ````

1. **clean-webpack-plugin配置**
    ````
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    new CleanWebpackPlugin(
        ['dist/',],　 //匹配删除的文件
        {
            root: __dirname,       　　　　　　　　　　//根目录
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry:      false        　　　　　　　　　　//启用删除文件
        }
    )
    ````

1. **打包**
    
    项目打包策略遵循以下几点原则：    
    * 选择合适的打包粒度，生成的单文件大小不要超过500KB    
    * 充分利用浏览器的并发请求，同时保证并发数不超过6  
    * 尽可能让浏览器命中304，频繁改动的业务代码不要与公共代码打包  
    * 避免加载太多用不到的代码，层级较深的页面进行异步加载  
     
    基于以上原则，我选择的打包策略如下：    
    * 第三方库如jquery、angular、angular-ui打包为一个文件
    * 公共组件如弹窗、菜单等打包为一个文件
    * 工具类、项目通用基类打包为一个文件
       
    11. 第三方库的打包
    
        配置文件的写法:
    
            entry: {
                vendor: ['jquery', 'angular', 'angularUiRouter']
            },
            resolve: {
                alias: {
                    jquery: path.resolve(__dirname, 'app/bower_components/jquery/dist/jquery'),
                    angular: path.resolve(__dirname, 'app/bower_components/angular/angular'),
                    angularUiRouter: path.resolve(__dirname, 'app/bower_components/angular-ui-router/release/angular-ui-router'),
                }
            },
            
        为了把第三方库拆分出来，我们还需要用webpack的CommonsChunkPlugin插件来把它提取一下，这样他就不会与业务代码打包到一起了。代码：
        
            new webpack.optimize.CommonsChunkPlugin('vendor'),
    
    11. 公共组件的打包
    
        
        
        