/*
 @description: 轮播
 @function define: $.fn.pluginName || jQuery.prototype.pluginName
 @usage: $(element).pluginName();
 */

+ function ($) {
    $.fn.carouselLeftRight = function (options) {
        return this.each(function () {
            var option = $.extend({},$.fn.carouselLeftRight.defaults,options || {});

            var objName = option.objName;
            var cArr = option.cArr;
            var index = option.index;
            var speed = option.speed;
            var arrLen = cArr.length;

            //上一张
            function previmg(){
                cArr.unshift(cArr[arrLen-1]);
                cArr.pop();
                $(".switch-block li").each(function(i,e){
                    $(e).removeClass().addClass(cArr[i]);
                });
                index--;
                if (index<0) {
                    index=arrLen-1;
                };
            };
            //下一张
            function nextimg(){
                cArr.push(cArr[0]);
                cArr.shift();
                $(objName).find("li").each(function(i,e){
                    $(e).removeClass().addClass(cArr[i]);
                });
                index++;
                if (index>=arrLen) {
                    index=0;
                };
            };

            timer=setInterval(nextimg,speed);
            $(objName).mouseover(function(){
                clearInterval(timer);
            });
            $(objName).mouseleave(function(){
                timer=setInterval(nextimg,speed);
            });
        });


        // return $(this).each(function () {
        //     console.log(option);
        //     timer=setInterval(nextimg,speed);
        //     $(".switch-block").mouseover(function(){
        //         clearInterval(timer);
        //     });
        //     $(".switch-block").mouseleave(function(){
        //         timer=setInterval(nextimg,speed);
        //     });
        // });
    };
    $.fn.carouselLeftRight.defaults = {
        objName:'',
        cArr : [],
        index : 0,
        speed : 4000,
    };
}(jQuery);


//点击class为li-1的元素触发上一张
$(document).on("click",".li-1",function(){
    previmg();
    return false;
});

//点击class为li-3的元素触发下一张
$(document).on("click",".li-3",function(){
    nextimg();
    return false;
});

