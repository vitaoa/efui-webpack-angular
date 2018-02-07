'use strict';

$(function () {
    angular.bootstrap(document, ['evApp']);
});

angular.module('evApp', [])
    .run(function ($rootScope) {
        console.log($rootScope);
    });