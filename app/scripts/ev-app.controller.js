/**
 * Created by vita on 2018/4/8.
 */

    angular.module('evApp.controller', [])
        .controller('pluginController', ['$scope' ,function($scope) {
            $scope.docsTit = "插件";
            $scope.docsMsg = "基于jQuery库的插件介绍";
            $scope.countTo = function(o){
                var $this = $(o);
                $this.each(function (a) {
                    $(this).data("countToOptions", {
                        formatter: function(b, a) {
                            return b.toFixed(0).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")
                        }
                    });
                    a = $.extend({},a || {},$(this).data("countToOptions") || {});
                    $(this).countTo(a);
                });
            };
            $scope.squareDrawInit = function (id,hitprize) {
                $(this).squareDraw({
                    objId:id,
                    eventObj:".lottery-btn",
                    hitprize:hitprize
                });
            };
            $scope.rotaryDrawInit = function (id) {
                $(this).rotaryDraw({
                    objId:id
                });
            };
            $scope.carouselLeftRight = function (a) {
                a = $.extend({},a || {});
                $(this).carouselLeftRight(a);
            };
            $scope.infosPlayAuto = function (i,ele,time) {
                var curIndex = i;
                var timeInterval = time;
                var _obj = $(ele);
                setInterval(changeinfos,timeInterval);
                function changeinfos() {
                    if (curIndex == _obj.length-1) {
                        curIndex = 0;
                    } else {
                        curIndex += 1;
                    }
                    _obj.eq(curIndex).fadeIn().siblings().fadeOut();
                }
            };
            $scope.eachOneScrollUp = function (ele,time) {
                var timeInterval = time;
                var _obj = $(ele),
                    scrollTimer;
                _obj.hover(function(){
                    clearInterval(scrollTimer);
                },function(){
                    scrollTimer = setInterval(function(){
                        scrollNews(_obj);
                    },timeInterval);
                }).trigger("mouseout");
                function scrollNews(obj){
                    var $self = obj.find("ul:first");
                    var lineHeight = $self.find("li:first").outerHeight(true);
                    $self.animate({ "top" : -lineHeight +"px" },600 , function(){
                        $self.css({"top":"0px"}).find("li:first").appendTo($self);
                    })
                }
            };
            $scope.eachOneScrollLeft = function (ele,time) {
                var timeInterval = time;
                var _obj = $(ele),
                    scrollTimer;
                _obj.hover(function(){
                    clearInterval(scrollTimer);
                },function(){
                    scrollTimer = setInterval(function(){
                        scrollNews(_obj);
                    },timeInterval);
                }).trigger("mouseout");
                function scrollNews(obj){
                    var $self = obj.find("ul:first");
                    var lineWidth = $self.find("li:first").outerWidth(true);
                    $self.animate({ "left" : -lineWidth +"px" },600 , function(){
                        $self.css({"left":"0px"}).find("li:first").appendTo($self);
                    })
                }
            };
            $scope.marqueeScrollUp = function (a) {
                a = $.extend({}, a || {});
                var speed = a.speed;

                var tab = document.getElementById(a.cArr[0]);
                var tab1 = document.getElementById(a.cArr[1]);
                var tab2 = document.getElementById(a.cArr[2]);

                tab2.innerHTML=tab1.innerHTML;

                function Marquee(){
                    if(tab2.offsetHeight-tab.scrollTop<=0)
                        tab.scrollTop-=tab1.offsetHeight;
                    else{
                        tab.scrollTop++;
                    }
                }
                var MyMar=setInterval(Marquee,speed);
                tab.onmouseover=function() {clearInterval(MyMar)};
                tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
            };
            $scope.marqueeScrollLeft = function (a) {
                a = $.extend({}, a || {});
                var speed = a.speed;

                var tab = document.getElementById(a.cArr[0]);
                var tab1 = document.getElementById(a.cArr[1]);
                var tab2 = document.getElementById(a.cArr[2]);

                tab2.innerHTML=tab1.innerHTML;

                function Marquee(){
                    if(tab2.offsetWidth-tab.scrollLeft<=0)
                        tab.scrollLeft-=tab1.offsetWidth;
                    else{
                        tab.scrollLeft++;
                    }
                }
                var MyMar=setInterval(Marquee,speed);
                tab.onmouseover=function() {clearInterval(MyMar)};
                tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
            }
        }]);