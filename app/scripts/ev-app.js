'use strict';


$(function () {
    angular.bootstrap(document, ['evApp']);
});

angular.module('evApp', ['ui.router'])

    .config(["$stateProvider","$urlRouterProvider","$locationProvider", function ($stateProvider,$urlRouterProvider,$locationProvider){
        $locationProvider.hashPrefix('');
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