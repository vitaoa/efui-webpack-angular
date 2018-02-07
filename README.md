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