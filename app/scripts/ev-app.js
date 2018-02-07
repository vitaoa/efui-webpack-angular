'use strict';
require('appRoutes');

// css 文件引入

require("../styles/reset.min.css");
require("../styles/efui.min.css");
require("../styles/main.min.css");
require("../styles/nav.min.css");
require("../styles/sidebar.min.css");
require("../styles/prettyprint.min.css");
require("../styles/button.min.css");
require("../styles/popup.min.css");
require("../styles/animation.min.css");
require("../styles/ncss.min.css");
require("../styles/plugin.min.css");

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