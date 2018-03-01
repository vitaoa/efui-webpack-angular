'use strict';
var $ = require('jquery');
require('angular');
require('appRoutes');
require('angularUiRouter');

// css 文件引入

require("../styles/_base.scss");
require("../styles/_layout.scss");
require("../styles/_navbar.scss");
require("../styles/_component.scss");

$(function () {
    angular.bootstrap(document, ['evApp']);
});

angular.module('evApp', ['evApp.routes'])

    //directive定义
    .directive('headerpanel', function () {
        return {
            restrict: 'EA',
            templateUrl: 'partials/common/header.html'
        };
    })
    .directive('footerpanel', function () {
        return {
            restrict: 'EA',
            templateUrl: 'partials/common/footer.html'
        };
    })

    .run(function ($rootScope) {
        console.log($rootScope);
    });