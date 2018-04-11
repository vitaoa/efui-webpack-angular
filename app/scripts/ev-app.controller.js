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
            // $scope.squareDraw = function (id) {
            //     $(id).squareDraw({
            //         eventObj:".lottery-btn"
            //     });
            // };
        }])