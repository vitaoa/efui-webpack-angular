
+(function($) {
    'use strict';

    $.fn.extend({
	    DownTime:function (d) {
	        console.log(this)
            var EndTime = new Date(d);
            var NowTime = new Date();
            var t = EndTime.getTime() - NowTime.getTime();
            var h = 0;
            var m = 0;
            var s = 0;
            t >= 0 && (
                h = Math.floor(t / 1000 / 60 / 60 % 24) < 10 ? '0' + Math.floor(t / 1000 / 60 / 60 % 24) : Math.floor(t / 1000 / 60 / 60 % 24),
                    m = Math.floor(t / 1000 / 60 % 60) < 10 ? '0' + Math.floor(t / 1000 / 60 % 60) : Math.floor(t / 1000 / 60 % 60),
                    s = Math.floor(t / 1000 % 60) < 10 ? '0' + Math.floor(t / 1000 % 60) : Math.floor(t / 1000 % 60)
            );
            $(this).find("[class$='_h']").length && $(this).find("[class$='_h']").html("<i>" + String(h)[0] + "</i><i>" + String(h)[1] + "</i>时");
            $(this).find("[class$='_m']").length && $(this).find("[class$='_m']").html("<i>" + String(m)[0] + "</i><i>" + String(m)[1] + "</i>分");
            $(this).find("[class$='_s']").length && $(this).find("[class$='_s']").html("<i>" + String(s)[0] + "</i><i>" + String(s)[1] + "</i>秒");
	    },
    });
})(jQuery);


(function ($) {
    $.fn.sliderLeftRight = function () {
	    var ele = $(this);
	    var slideprev = ele.find('.arrow-prev');
	    var slidenext = ele.find('.arrow-next');
	    var slider = ele.find('.picswitch-itmes ul');
	    var slideritemW = ele.find('.picswitch-itmes li').outerWidth(true);
	    var sliderlen = ele.find('.picswitch-itmes li').length;

	    slider.width(sliderlen*slideritemW);
	    slideprev.click(function () {
		    prevBtn();
	    });
	    slidenext.click(function () {
		    nextBtn();
	    });

        function prevBtn() {
            slider.children('li').last().prependTo(slider);
            slider.css("left",-slideritemW);
            slider.stop(true).animate({
                left:0
            },300);
        }
        function nextBtn() {
            slider.stop(true).animate({
                left:-slideritemW
            },300,function () {
                slider.children('li').first().appendTo(slider);
                slider.css("left",0);
            });
        }
        
	    // var t=null;
	    // var timer=function(){
		 //    window.clearInterval(t);
		 //    t=window.setInterval(function(){
			//     nextBtn();
		 //    },4000);
	    // };
	    // timer();
	    // slider.hover(function(){
		 //    window.clearInterval(t);
	    // },function(){
		 //    timer();
	    // });
    }
})(jQuery);
