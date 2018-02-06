'use strict';

//import $ from 'jquery'; //import是ES6的模块化规范关键字。使用import，必须引入babel转义支持。import是按需加载，可以提高编译器效率。
var $ = require('jquery');//Require是CommonJS的语法。require是运行时加载


$(function (e) {
    console.log($('body'));
})

