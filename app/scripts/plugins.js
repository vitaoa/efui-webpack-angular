
+(function($) {
    'use strict';

    $.fn.extend({
	    DownTime:function (d) {
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
	    TimeCountDown:function (d,s,arr) {
		    this.each(function(){
			    var EndTime = new Date(d);
			    var t = EndTime.getTime() - new Date().getTime();

			    var o = {
				    ms: $(this).find("."+arr.ms),
				    sec: $(this).find("."+arr.sec),
				    mini: $(this).find("."+arr.mini),
				    hour: $(this).find("."+arr.hour),
				    day: $(this).find("."+arr.day)
			    };

			    var timeout = function () {
				    t = EndTime.getTime() - new Date().getTime();
				    o.ms && o.ms.html($.fn.countNumber(t , 1000,true));
				    o.sec && o.sec.html($.fn.countNumber(t / 1000,60,true));
				    o.mini && o.mini.html($.fn.countNumber(t / 1000 / 60,60,true));
				    o.hour && o.hour.html($.fn.countNumber(t / 1000 / 60 / 60,60,true));
				    o.day && o.day.html($.fn.countNumber(t / 1000 / 86400,0,true));
			    };
			    if(t > 0){
				    setInterval(timeout, s);
			    }
		    });
	    },
	    countNumber :function (val,num,zero) {
		    var _res = 0;
		    if(num===1000){
			    _res = Math.floor(val % num);
		    }else if(num===60){
			    _res = Math.floor(val % num);
		    }else{
			    _res = Math.floor(val);
		    }
		    var _zero = (num > 100) ? ((_res < 10) ? '00' : ((_res < 100) ? '0' : '')) : (_res < 10) ? '0' : '';
		    return zero ? _zero+_res : _res;
	    },
	    txtTyping:function (options) {
		    var text = options.text;
		    var words = $("#"+options.id);
		    var Input = false;
		    if(document.getElementById(options.id).tagName.toLocaleLowerCase()==='input'){
			    Input = true;
		    }
		    var tempWords = "";
		    var intervalF = null;
		    var typing = function (){
			    tempWords = text.substring(0,tempWords.length+1);
			    if(tempWords.length<=text.length){
				    Input ? words.val(tempWords): words.text(tempWords);
				    if(tempWords.length===text.length){
					    clearInterval(intervalF);
					    Input ? words.blur():'';
				    }
			    }
		    };
		    if(words.val().length>0 ||words.text().length>0){
		    	clearInterval(intervalF);
		    }else{
			    intervalF = setInterval(typing,options.time);
		    }
	    },
	    sliderLeftRight000:function (options) {
		    var _cur = 0;
		    var ele = $('.'+options.className);
		    var slideprev = ele.find('.arrow-prev');
		    var slidenext = ele.find('.arrow-next');
		    var sliderBtns = ele.find('.op-btn span');
		    var sliderLoopBtn = ele.find('.switch-btn');
		    var slider = ele.find('.picswitch-itmes');
		    var sliderlen = ele.find('.picswitch-itmes li').length;

		    var _W = ele.width();
		    ele.find('.picswitch-itmes li').width(_W);
		    slider.width(sliderlen*_W);

		    sliderBtns.click(function () {
			    _cur = $(this).index();
			    sliderPlay(_cur);
		    });
		    slideprev.click(function () {
			    sliderPrev();
		    });
		    slidenext.click(function () {
			    sliderNext();
		    });
		    sliderLoopBtn.click(function () {
			    sliderNext();
		    });

		    function sliderPlay(i) {
			    sliderBtns.eq(i).addClass('active').siblings().removeClass('active');
			    slider.stop(true).animate({
				    left:-i*_W
			    },300);
		    }
		    function sliderNext() {
			    if(_cur>=sliderlen-1){
				    _cur = -1;
			    }
			    sliderPlay(++_cur);
		    }
		    function sliderPrev() {
			    if(_cur<=0){
				    _cur = sliderlen;
			    }
			    sliderPlay(--_cur);
		    }

		    var startX, startY;
		    function touchStart(event) {
			    try {
				    var touch = event.touches[0];
				    var x = Number(touch.pageX);
				    var y = Number(touch.pageY);
				    startX = x;
				    startY = y;
			    } catch (e) {}
		    }
		    function touchEnd(event) {
			    try {
				    for (var i = 0; i < event.changedTouches.length; i++) {
					    var ot = event.changedTouches[i];
					    if (!ot) return;
					    _cur = parseInt(Math.abs(slider.position().left/_W));
					    var dx = startX - ot.clientX;
					    if(dx>0){
						    if(_cur<sliderlen-1){
							    sliderPlay(++_cur);
						    }
					    }
					    else{
						    if(_cur>0){
							    sliderPlay(--_cur);
						    }
					    }
				    }
			    } catch (e) {}
		    }


		    var touch=('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		    if(touch){
			    ele.get(0).addEventListener('touchstart',touchStart,false);
			    ele.get(0).addEventListener('touchend',touchEnd,false);
		    }

		    if(options.loop){
			    var t=null;
			    var timer=function(){
				    window.clearInterval(t);
				    t=window.setInterval(function(){
					    if(_cur>=sliderlen-1){_cur=-1;}
					    sliderPlay(++_cur);
				    },options.speed);
			    };
			    timer();
			    slider.hover(function(){
				    window.clearInterval(t);
			    },function(){
				    timer();
			    });
		    }
	    },
	    copyLinks:function (options) {
			var e = document.getElementById(options.id);
			e.select();
			try{
				if(document.execCommand('copy', false, null)){
					tooltip({msg:"Copy the link successfully"});
				} else{
					tooltip({msg:"This function does not support the browser, please manually copy the text box"});
				}
			} catch(err){
				tooltip({msg:"copy failed！"});
			};
		    bindClickHide('.PopupLayer','.PopupCon');
		},
    });
})(jQuery);


