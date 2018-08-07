
    angular.module('evApp.routes', ['ui.router'])
        .config(["$stateProvider","$urlRouterProvider","$locationProvider", function ($stateProvider,$urlRouterProvider,$locationProvider){
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/animation/transition');
            $stateProvider
                .state("index", { //导航用的名字，如<a ui-sref="login">login</a>里的login
                    url: '/',    //访问路径
                    templateUrl: "app/partials/common/main.html",
                    controller: function($scope, $location) {
                        $scope.docsTit = "Easy Fast UI Frame";
                        $scope.docsMsg = "EFUI为一款轻量级前端UI框架，通俗易懂的写法及模块式的拼装方便自由扩展，简单易用，轻量快捷。";
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "app/partials/login/index.html",
                    controller: function($scope) {
                        $scope.submitted = false;
                        $scope.login = function() {
                            if ($scope.loginForm.$valid && $scope.login.username == 'vvvv'){
                                window.sessionStorage.setItem("loginSessionState",true);
                                var href = '/';
                                location.href = href;
                            } else {
                                window.sessionStorage.setItem("loginSessionState",false);
                                $scope.loginForm.submitted = true;
                            }
                        }
                    }
                })
                .state('animation', {
                    url: "/animation",
                    templateUrl: "app/partials/animation/index.html",
                    controller: 'animationController'
                })
                .state('animation.pages', {
                    url: "/:pageid",
                    templateUrl: function($paramid){return 'app/partials/animation/'+$paramid.pageid+'.html';}
                })
                .state('standard', {
                    url: "/standard",
                    templateUrl: "app/partials/standard/index.html",
                    controller: function($scope, $location) {
                        $scope.docsTit = "规范";
                        $scope.docsMsg = "CSS规范、HTML规范、JavaScript规范、浏览器兼容性";
                    }
                })
                .state('standard.pages', {
                    url: "/:pageid",
                    templateUrl: function($paramid){return 'app/partials/standard/'+$paramid.pageid+'.html';}
                })
                .state('element', {
                    url: "/element",
                    templateUrl: "app/partials/element/index.html",
                    controller: function($scope, $location) {
                        $scope.docsTit = "基本元素";
                        $scope.docsMsg = "CSS样式、HTML标签";
                    }
                })
                .state('element.pages',{
                    url:'/:pageid',
                    templateUrl:function($paramid){return 'app/partials/element/'+$paramid.pageid+'.html';}
                })
                .state('component', {
                    url: "/component",
                    templateUrl: "app/partials/component/index.html",
                    controller: 'componentController'
                })
                .state('component.pages', {
                    url: "/:pageid",
                    templateUrl: function($routeParams){return 'app/partials/component/'+$routeParams.pageid+'.html'}
                })
                .state('plugin', {
                    url: "/plugin",
                    templateUrl: "app/partials/plugin/index.html",
                    controller: 'pluginController'
                })
                .state('plugin.pages', {
                    url: "/:pageid",
                    templateUrl: function($routeParams){return 'app/partials/plugin/'+$routeParams.pageid+'.html'}
                })
                .state('skills', {
                    url: "/skills",
                    templateUrl: "app/partials/skills/index.html",
                    controller: 'skillsController'
                })
                .state('skills.pages', {
                    url: "/:pageid",
                    templateUrl: function($routeParams){return 'app/partials/skills/'+$routeParams.pageid+'.html'}
                })
                .state('frame', {
                    url: "/frame",
                    templateUrl: "app/partials/frame/index.html",
                    controller: function($scope, $location) {
                        $scope.docsTit = "前端框架库";
                        $scope.docsMsg = "以Javascript语言为基础搭建的编程框架";
                        $scope.isShow = false;
                        $scope.menulist = [
                            {
                                "firstName": "Angular",
                                "likes": [
                                    {
                                        'title':"SPA",
                                        'submenu':[
                                            {'name':"angular基础",'url':"angular"},
                                            {'name':"表单验证",'url':"angular-form-validate"},
                                            {'name':"子页面2",'url':"angular-spa2"},
                                            {'name':"子页面3",'url':"angular-spa3"}
                                        ]
                                    }
                                ]
                            },
                            {
                                "firstName": "Vue",
                                "likes": [
                                    {
                                        'title':"vue",
                                        'submenu':[
                                            {'name':"vue简介",'url':"vue"}
                                        ]
                                    }
                                ]
                            },
                            // {
                            //     "firstName":"React",
                            //     "likes":[
                            //         {
                            //             'title':'react',
                            //             'url':'react',
                            //             'abstract':''
                            //         }
                            //     ]
                            // }
                        ];
                        $scope.submitForm = function(isValid) {
                            if (!isValid) {
                                alert('验证失败');
                            }
                        };
                    }
                })
                .state('frame.pages', {
                    url: '/:pageid',
                    templateUrl:function($routeParams){return 'app/partials/frame/'+$routeParams.pageid+'.html';},
                    controller: function($scope, $location,$state,$stateParams,$element) {
                        $scope.pagename = $stateParams.pageid;
                        $scope.toggleClass = function(){
                            console.log($scope.pagename);
                        }
                    }
                })
        }])
