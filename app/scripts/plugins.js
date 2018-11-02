
(function($) {
    'use strict';

    $.fn.extend({
        timeToUTC:function () {
			return this.each(function () {
				var _dt = $(this).data('time');
				var _time = new Date(_dt);
				if(!!_dt){
					var _t0 =[[_time.getUTCMonth() + 1,_time.getUTCDate()].join('-'),[_time.getUTCHours(),_time.getUTCMinutes()].join(":")].join(' ').replace(/(?=\b\d\b)/g,"0");
					$(this).text(_t0 + " (GMT+0)")
				}
			});
		},
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
	     * speed/loop/wrapper/pagination/cur/prev/next
	     * */
	    sliderLeftRight	: function (options) {
            options = $.extend({}, options || {});

            let ele = $(this);
            let slider = ele.find(options.wrapper);
            let sliderlen = ele.find(options.item).length;
            let sliderBtns = ele.find(options.pagination + ' span');
            let slideprev = ele.find(options.prev);
            let slidenext = ele.find(options.next);

            let _W = slider.parent().width();
            let _cur = options.cur || 0;


            if(options.arrowPrevClass){
                slideprev.mouseover(function () {
                    $(this).children().addClass(options.arrowPrevClass)
                });
                slideprev.mouseout(function () {
                    $(this).children().removeClass(options.arrowPrevClass)
                });
            }
            if(options.arrowNextClass){
                slidenext.hover(function () {
                    $(this).children().addClass(options.arrowNextClass)
                },function () {
                    $(this).children().removeClass(options.arrowNextClass)
                })
            }

            slideprev.click(function () {
                sliderPrev();
            });
            slidenext.click(function () {
                sliderNext();
            })
            sliderBtns.click(function () {
                _cur = $(this).index();
                sliderPlay(_cur);
            });

            function sliderPlay(i) {
                if(options.paginationClass){
                    sliderBtns.eq(i).addClass(options.paginationClass).siblings().removeClass(options.paginationClass);
                }else{
                    sliderBtns.eq(i).addClass('active').siblings().removeClass('active');
                }
                slider.stop(true).animate({
                    left: -i * _W
                }, 300);
            }

            function sliderNext(wipe) {
                if (_cur >= sliderlen - 1) {
                    if(wipe){
                        return false;
                    }
                    _cur = -1;
                }
                sliderPlay(++_cur);
            }

            function sliderPrev(wipe) {
                if (_cur <= 0) {
                    if(wipe){
                        return false;
                    }
                    _cur = sliderlen;
                }
                sliderPlay(--_cur);
            }

            $(this).Touch({
                element:slider.parent(),
                mouseEvents:true,
                wipeLeft:function () {
                    sliderNext(true);
                },
                wipeRight:function () {
                    sliderPrev(true);
                }
            });

            let t = null;
            let timer;
            if (options.loop) {
                timer = function () {
                    window.clearInterval(t);
                    t = window.setInterval(function () {
                        if (_cur >= sliderlen - 1) {
                            _cur = -1;
                        }
                        sliderPlay(++_cur);
                    }, options.speed);
                };
                timer();

                if (!isTouch) {
                    slider.mouseover(function () {
                        window.clearInterval(t);
                    });
                    slider.mouseout(function () {
                        timer();
                    });
                }
            }

            init();
            function init() {
                slider.find('li').width(_W);
                slider.width(sliderlen * _W);
                if(options.paginationClass){
                    sliderBtns.eq(_cur).addClass(options.paginationClass);
                }else{
                    sliderBtns.eq(_cur).addClass('active');
                }
            }
        },
	    goToPage : function (wrap,item,dir) {
	    	var _len = $(wrap).find(item).length;
            var _index = 0;
            var _cur_index = 0;

            $(wrap).find(item).each(function(){
                if($(this).is(':visible')){
                    _cur_index = $(this).index();
				}
			});
            if(dir>0){
                if(_cur_index>=_len){
                    _index = _cur_index;
                }else{
                    _index = _cur_index+1;
				}
            }else{
                if(_cur_index<=0){
                    _index = _cur_index;
                }else{
                    _index = _cur_index-1;
                }
            };

            $(wrap).find(item).eq(_index).css('display','table-cell').siblings(item).css('display','none');
			if(_index>=_len-1){
				var num = 0;
				var speed = 1000;
				clearInterval(timer);
				var _dom = $('.bubble-block');
                _dom.css('top','0px');
				var timer = setInterval(function(){
					if(num<_dom.find('.bubble-item').length){
                        _dom.scrollPlay('.bubble-item',num++,speed);
					}
				},speed);
			}
		},
        scrollPlay : function(subdom,i,speed) {
			var $self = $(this);
			var lineHeight = $self.find(subdom).eq(i-1).outerHeight(true);

            $self.stop(true).animate({
                top:-i*lineHeight
            },speed);
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


