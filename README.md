# efui - Web

Mobile-friendly Angular based web app for the efui Platform

Requires ```node```


### webpack构建配置
1. **jQuery引入**
    
    11. 直接在 html 中引入
        
        > &lt;script src="bower_components/jquery/dist/jquery.js"></script>
        
          需要 import 或 require 进来的话，就在 externals 中把它配置为全局，不会打包。（目测不需要用？）
        > externals: {
              jquery: 'window.$'
          }
          
        > import $ from 'jquery';
          var $ = require('jquery');

