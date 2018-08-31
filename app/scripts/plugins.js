
(function($) {
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

	    /* @param:
	     * speed/loop/etouch/wrapper/pagination/cur/prev/next
	     * */
	    sliderLeftRight	: function (options) {
		    options = $.extend({},options||{});

		    let ele = $(this);
		    let slider = ele.find(options.wrapper);
		    let sliderlen = ele.find(options.item).length;
		    let sliderBtns = ele.find(options.pagination +' span');
		    let slideprev = ele.find(options.prev);
		    let slidenext = ele.find(options.next);

		    let _W = ele.width();
		    let _cur = options.cur || 0;

		    init();
		    function init() {
			    slider.find('li').width(_W);
			    slider.width(sliderlen*_W);
			    sliderBtns.eq(_cur).addClass('active');
		    }
		    slideprev.click(()=>{
			    sliderPrev();
		    });
		    slidenext.click(()=> {
			    sliderNext();
		    });
		    sliderBtns.click(()=>{
			    _cur = $(this).index();
			    sliderPlay(_cur);
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


		    let startX;
		    function touchStart(event) {
			    try {
				    let touch = event.touches[0];
				    let x = Number(touch.pageX);
				    startX = x;
			    } catch (e) {}
		    }
		    function touchEnd(event) {
			    try {
				    for (let i = 0; i < event.changedTouches.length; i++) {
					    let ot = event.changedTouches[i];
					    if (!ot) return;
					    _cur = parseInt(Math.abs(slider.position().left/_W));
					    let dx = startX - ot.clientX;
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

		    let touch=('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		    if(touch && options.etouch){
			    // ele.touchX(options);
			    console.log(ele.get(0))
			    ele.get(0).addEventListener('touchstart',$.myTouch.touchX(this),false);
			    ele.get(0).addEventListener('touchend',$.myTouch.touchX(this),false);
		    }

		    let t=null;
		    let timer;
		    if(options.loop){
			    timer=function(){
				    window.clearInterval(t);
				    t=window.setInterval(function(){
					    if(_cur>=sliderlen-1){_cur=-1;}
					    sliderPlay(++_cur);
				    },options.speed);
			    };
			    timer();

			    if(!touch){
				    slider.onmouseover=function() {window.clearInterval(t);};
				    slider.onmouseout=function() {timer();};
			    }
		    }

	    },
	    goToPage : function (i) {
			$('.part'+i).css('display','table-cell').siblings('[class*="part"]').css('display','none');
			if(i===5){
				var num = 0;
				clearInterval(timer);
				$('.bubble-block').css('top','0px');
				$('.popupBubble').hide();
				$('.popupBubble .bubble-item').removeClass('fadeInUp');
				setTimeout(function () {
					$('.popupBubble').show();
					timer = setInterval(function(){
						if(num<len){
							scrollPlay('.bubble-block','.bubble-item',num++);
						}
					},1000);
				},3000);
			}
		},
	    scrollPagePlay : function(dom,subdom,i) {
			var $self = $(dom);
			var lineHeight = $self.find(subdom).eq(i-1).outerHeight(true);

			$self.find(subdom).eq(i).addClass('fadeInUp');
			if(i<5){return false;}
			else{
				$self.stop(true).animate({
					top:-(i-4)*lineHeight
				},600);
				if(i>=len-1){
					setTimeout(function () {
						$('.popupBubble').hide();
					},4000);
				}
			}
		},
	    touchY : function (options) {
		    var startY;
		    var sliderlen = $('.pagePart').length;
		    function touchStart(event) {
			    for (var i = 0; i < event.targetTouches.length; i++) {
				    var touch = event.targetTouches[i];
				    startY = touch.pageY;
			    }
		    }
		    function touchEnd(event) {
			    for (var i = 0; i < event.changedTouches.length; i++) {
				    var ot = event.changedTouches[i];
				    if (!ot) return;
				    var dy = startY - ot.clientY;

				    var mm = $('.pagePart:visible').attr('class').match(/part\d{1,}/g);
				    var _cur = parseInt(mm[0].replace('part',''));
				    if(dy>0){
					    if(_cur<sliderlen){
						    gotoPage(++_cur);
					    }
				    }
				    else if(dy<0){
					    if(_cur>1){
						    gotoPage(--_cur);
					    }
				    }
			    }
		    }
		    var touch=('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		    if(touch){
			    document.addEventListener('touchstart',touchStart,false);
			    document.addEventListener('touchend',touchEnd,false);
		    }
	    },
	    marqueeScrollLeft : function (a) {
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
		    var touch=('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		    if(!touch){
			    tab.onmouseover=function() {clearInterval(MyMar)};
			    tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
		    }
	    },
	    eachOneScrollUp : function (ele,time) {
		    var timeInterval = time;
		    var _obj = $(ele),scrollTimer;
		    var $self = _obj.find("ul:first");

		    var lineHeight = $self.find("li:first").outerHeight(true);
		    _obj.hover(function(){
			    clearInterval(scrollTimer);
		    },function(){
			    scrollTimer = setInterval(function(){
				    scrollList();
			    },timeInterval);
		    }).trigger("mouseout");
		    function scrollList(){
			    $self.stop(true).animate({ "top" : -lineHeight +"px" },500 , function(){
				    $self.css({"top":"0px"}).find("li:first").appendTo($self);
			    })
		    }
	    },
    });
})(jQuery);


