'use strict';
require('appRoutes');

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