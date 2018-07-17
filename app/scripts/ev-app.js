'use strict';



require(['entryCss'], function () {
    setTimeout(function () {
	    angular.bootstrap(document, ['evApp']);
	    $('.page-loader').fadeOut(1000);
    },1000);

});

angular.module('evApp', ['evApp.routes','evApp.controller'])
    /* 缓存模板templateUrl */
    .run(["$templateCache", function($templateCache) {
        $templateCache.put("toptitle.html", '<h3 class="mb10" ng-repeat="data in menulist" ng-click="toggleClass()">'+
            '<span ng-repeat="item in data.likes">'+
            '<span class="red" ng-if="!item.submenu && item.title == pagename">{{item.title}}:{{item.abstract}}</span>'+
            '<span ng-if="item.submenu" ng-repeat="subitem in item.submenu">'+
            '<span ng-if="pagename == subitem.url">{{subitem.name}}</span>'+
            '</span>'+
            '</span>'+
            '</h3>');

    }])
	.filter('hidetel',function () {
		return function (input,arg) {
			//input =>'13834890323'

			//return '138****0323';
			return input.substring(0,3)+'****'+input.substring(7);
		}
	})

    .controller('MainController', function ($scope) {
        $scope.name = '林炳文';
    })

    //directive定义
    .directive('headerpanel', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/partials/common/header.html'
        };
    })
    .directive('footerpanel', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/partials/common/footer.html'
        };
    })
    .directive('my-class', function () {
        return {
            restrict: 'C'
        };
    })
    .directive('panel', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div><div ng-transclude class="sidebar-slide-overlay"></div></div>',
            transclude: true,
            link:function(scope){
                scope.things = [11,22,33];
                scope.data =  [
                    {
                        str: '表单a'
                    },
                    {
                        str: '表单b'
                    },
                    {
                        str: '表单c'
                    }
                ];
            }
        };
    })
    .directive('expander', function () {
        return {
            restrict: 'EA',
            transclude : true,
            replace: true,
            template : '<div ng-transclude></div>',
            link : function(scope, element, attrs) {
                scope.showMe = false;
                scope.answershow = false;
                scope.title = '点击展开';
                scope.title2 = '点击缩回';
                scope.text = '这里是内部的内容。';
                scope.data =  [
                    {
                        str: '表单a'
                    }
                ];
                scope.className = function() {
                    var className = 'initClass';
                    var _num = parseInt(scope.$index);
                    if (++_num)
                        className += _num;
                    return className;
                };
                scope.toggle = function toggle() {
                    //console.log('toggle me!');
                    scope.showMe = !scope.showMe;
                }
                scope.toggleanswer = function(){
                    scope.answershow = !scope.answershow;
                };
            }
        };
    })
    .directive('topTitle', function() {
        return {
            restrict: 'EA',
            scope:true,
            templateUrl: 'toptitle.html',
            replace: true
        };
    })
    .directive('helloWorld', function() {
        return {
            restrict: 'EA',
            scope:true,
            templateUrl: 'hello.html',
            replace: true
        };
    })
    .directive("helloWorld2",function(){
        return{
            restrict:'EAC',
            transclude: true, //注意此处必须设置为true
            controller: function ($scope, $element,$attrs,$transclude,$log) { //在这里你可以注入你想注入的服务
                $transclude(function (clone) {
                    var a = angular.element('<p>');
    //			   		a.css('color', $attrs.mycolor);
                    a.text(clone.text());
    //			   		$element.append(a);
    //			   		var a = $transclude(); //$transclude()就是嵌入的内容
                    a.css('color', $attrs.mycolor);
                    $element.append(a);
    //			  		$log.info(clone);
                });
    //			  	$log.info("hello everyone");
            }
        };
    })
    .directive('myDirective', function () {
        return {
            restrict: 'EA',
            scope:true,
            template: '<div>儿子:{{ name }}<input ng-model="name"/></div>'
        };
    })
    .directive('multipleEmail', [function () {
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || emailsRegexp.test(value);
                    ngModel.$setValidity("multipleEmail", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }])

    .run(function ($rootScope, $location) {
        $rootScope.path = $location.path();
        $rootScope.$on('$locationChangeSuccess', function() {
            var _path = $location.path().substring(1);
            var _vpath = _path.indexOf('/');
            //console.log("$locationChangeSuccess");
            $rootScope.path = _vpath != -1 ? $location.path().substring(0, _vpath + 1) : $location.path();
        });
        $rootScope.loginFlag = false;
        $rootScope.$on("$viewContentLoaded", function(event, next) {
            if (window.sessionStorage.getItem("loginSessionState")) {
                $rootScope.loginFlag = window.sessionStorage.getItem("loginSessionState");
            }
            $('pre').each(function() {
                var _p_class = $(this).parent().get(0).className;
                !(/\bhtml\b/.test(_p_class)) && $(this).addClass("prettyprint linenums") && prettyPrint();
            });

            var _h = $(window).height();
            var _p = $('.view-container');
            var _o = $('.sidebar-menu'),
                _o_p = _o.parent(),
                _o_p_p = _o_p.parent();
            var _dif = _p.outerHeight(true) - _p.height();
            var _o_dif = _o_p_p.outerHeight(true) - _o_p_p.height();

            if(next) {
                _dif = _h - _dif;
                _p.children().each(function() {
                    _dif -= !$(this).hasClass('container') ? $(this).height() : 0;
                });
                _o.css({
                    'max-height': _dif - _o_dif,
                    'overflow-y': 'auto',
                    'width': _o_p.width()
                });
            }

        })
    });
