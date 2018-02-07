'use strict';

require('angular');

$(function () {
    angular.bootstrap(document, ['evApp']);
});

angular.module('evApp', [])
    .run(function ($rootScope) {
        console.log($rootScope);
    });