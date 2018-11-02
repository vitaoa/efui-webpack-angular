/**
 * Created by vita on 2018/8/13.
 */

$.extend(
	toggle = function (op) {
		/* *
		 * @dom:event element
		 * @wrap:parent
		 * @close:close class
		 * */
		if(op.dom){
			$(op.dom).click(function(){
				$(op.wrap).show();
			});
		}
		$(op.close).click(function(){
			$(op.wrap).hide();
		});
	},
	tooltip = function(a){
		a = $.extend({}, a || {});
		if(!a.dom){
			var _html = '<div class="popup-tb PopupLayer popCopyAlert">'+
				'<div class="popup-tb-cell"><div class="PopupBox"><div class="PopupCon">'+
				'<p class="al-c copyMsg"></p>'+
				'</div></div></div>'+
				'</div>';
			$('body').append(_html).find('.copyMsg').html(a.msg);
		}
		else{
			$(a.dom).show().find('.copyMsg').html(a.msg);
		}
	},
	bindClickHide = function (e1,e2) {
		$(e1 +' *').bind('click',function(e){
			if (e.stopPropagation) e.stopPropagation();
			else e.cancelBubble = true;
			$(this).closest(e1).length>0 && $(this).closest(e2).length<=0 && $(this).closest(e1).hide();
		});
	},
	tabSwitch = function (options) {
		/* *
		* @wrap:parent
		* @nav:events
		* @panel:switch
		* */
		$(options.nav).click(function(){
			var _index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$(this).closest(options.wrap).find(options.panel).eq(_index).addClass('active').siblings(options.panel).removeClass('active');
		});
	},

    isFunction = function(func){
        return type(func)=='function';
    },
    isObject = function (obj) {
    	return type(obj) == "object";
    },
    isArray = function (value) {
    	return value instanceof Array;
    },
    isTouch=function(){
    	return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    },
	isMobile = function () {
        if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            return true;
        }else {
            return false;
        }
    },
    isAndroid = function () {
        if(navigator.userAgent.match(/Android/i)){
            return true;
        }else{
            return false;
        }
    },
    isIos = function () {
        if(navigator.userAgent.match(/iPhone|iPad/i)){
            return true;
        }else{
            return false;
        }
    },

	//判断屏幕是否旋转
    orientationChange = function () {
        switch(window.orientation) {
            case 0:
                console.log("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height);
                break;
            case -90:
                console.log("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height);
                break;
            case 90:
                console.log("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height);
                break;
            case 180:
                console.log("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
                break;
        }
        return function() {
            if (win.orientation === 180 || win.orientation === 0) {      
            	meta.current = 'portrait';    
            }    
            if (win.orientation === 90 || win.orientation === -90) {      
            	meta.current = 'landscape';    
            }
        }
    },
    changeOrientation = function(ele){
    	console.log(ele)
        var width = document.documentElement.clientWidth;
        var height =  document.documentElement.clientHeight;
        if( width < height ){
            console.log(width + " " + height);
            ele.width(height);
            ele.height(width);
            ele.css('top',  (height-width)/2 );
            ele.css('left',  0-(height-width)/2 );
            ele.css('transform' , 'rotate(90deg)');
            ele.css('transform-origin' , '50% 50%');
        }

        var evt = "onorientationchange" in window ? "orientationchange" : "resize";

        window.addEventListener(evt, function() {
            console.log(evt);

            setTimeout( function(){
                var width = document.documentElement.clientWidth;
                var height =  document.documentElement.clientHeight;

                if( width > height ){

                    ele.width(width);
                    ele.height(height);
                    ele.css('top',  0 );
                    ele.css('left',  0 );
                    ele.css('transform' , 'none');
                    ele.css('transform-origin' , '50% 50%');
                }
                else{
                    ele.width(height);
                    ele.height(width);
                    ele.css('top',  (height-width)/2 );
                    ele.css('left',  0-(height-width)/2 );
                    ele.css('transform' , 'rotate(90deg)');
                    ele.css('transform-origin' , '50% 50%');
                }

            }  , 300 );


        }, false);
    },


    ClassReplace = function (ele,cur) {
        var _regExp = /\b(i-awards0\d)\b/g;
        var _regExpActive = /\b(i-awards0\d)h\b/g;
        var _classObj = ele.find('i').attr('class');
        var _classActive = _regExpActive.test(_classObj);
        var _classh = _classObj.replace(_regExp,"$1h");
        var _class = '';

        if(ele.length>1){
            ele.each(function () {
                _classObj = $(this).find('i').attr('class');
                _class = _classObj.replace(_regExpActive,"$1");
                $(this).find('i').attr('class',_class);
            })
        }
        !_classActive && !cur && ele.find('i').attr('class',_classh);
    }
);