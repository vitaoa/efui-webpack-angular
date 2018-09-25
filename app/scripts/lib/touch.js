/**
 * Created by vita on 2018/8/25.
 */

(function ($) {
    var coordinate={
        X:0,
        Y:0
    };
    var direction={
        X:0,
        Y:0
    };
    $.extend(
        addEventHandle = function(element,eventType,fn){
            if(element.addEventListener){
                element.addEventListener(eventType,fn,false);//非IE
            }else if(element.attachEvent){
                element.attachEvent('on'+eventType,fn);//IE，这里拼接上'on',调用的时候不要加on，使用click等。
            }else{
                element['on'+eventType] = fn;//这里使用[]方式实现对象的属性添加，相当于.的作用
            }
        },
        handleEvent = function(event){
            var event = event || window.event;
            switch(event.type){
                case "touchstart":
                    try {
                        let touch = event.touches[0];
                        coordinate.X = touch.clientX;
                        coordinate.Y = touch.clientY;
                    } catch (e) {
                        console.log(e.message)
                    }
                    break;
                case "touchend":
                    try {
                        for (let i = 0; i < event.changedTouches.length; i++) {
                            let ot = event.changedTouches[i];
                            if (!ot) return;

                            let dx = coordinate.X - ot.clientX;
                            let dy = coordinate.Y - ot.clientY;

                            if (dx > 0) {
                                // console.log('大于0，左滑动');
                                direction.X=true;
                            } else {
                                // console.log('小于0，右滑动')
                                direction.X=false;
                            }
                            if(dy > 0){
                                // console.log('大于0，上滑动')
                                direction.Y=true;
                            } else {
                                // console.log('小于0，下滑动')
                                direction.Y=false;
                            }
                        }
                    } catch (e) {
                        console.log(e.message)
                    }
                    break;
                case "touchmove":
                    // event.preventDefault();
                    break;
                case "mousedown":
                    try {
                        coordinate.X = event.clientX;
                        coordinate.Y = event.clientY;
                    } catch (e) {
                        console.log(e.message)
                    }
                    break;
                case "mouseup":
                    try {
                        let dx = coordinate.X - event.clientX;
                        let dy = coordinate.Y - event.clientY;

                        if (dx > 0) {
                            // console.log('大于0，左滑动');
                            direction.X=true;
                        } else {
                            // console.log('小于0，右滑动')
                            direction.X=false;
                        }
                        if(dy > 0){
                            // console.log('大于0，上滑动')
                            direction.Y=true;
                        } else {
                            // console.log('小于0，下滑动')
                            direction.Y=false;
                        }
                    } catch (e) {
                        console.log(e.message)
                    }
                    break;
                case "mousemove":
                    break;
            }
            return direction;
        }
    );
    $.fn.extend({
        Touch:function(options) {
            var defaults={
                element:document,
                wipeLeft:function(){/*向左滑动*/},
                wipeRight:function(){/*向右滑动*/},
                wipeUp:function(){/*向上滑动*/},
                wipeDown:function(){/*向下滑动*/},
                // wipe:function(){/*点击*/},
                // wipehold:function(){/*触摸保持*/},
                // wipeDrag:function(x,y){/*拖动*/},
                // drag:false,
                // preventDefaultEvents:true
            };
            options && $.extend(defaults,options);

            return this.each(function () {
                var supportTouch = "ontouchstart" in document.documentElement;
                var Events = [];
                var moveEvent = supportTouch ? "touchmove" : "mousemove",
                    startEvent = supportTouch ? "touchstart" : "mousedown",
                    endEvent = supportTouch ? "touchend" : "mouseup",
                    cancelEvent = supportTouch ? "touchcancel" : "mouseout";
                Events.push(moveEvent,startEvent,endEvent,cancelEvent);

                Events.forEach(function(eventName) {
                    addEventHandle($(defaults.element).get(0),eventName,function (event) {
                        var _dir = handleEvent(event);
                        if(eventName=='touchend' || eventName=='mouseup'){
                            if(_dir.X>0){
                                defaults.wipeLeft();
                            }else{
                                defaults.wipeRight();
                            };
                            if(_dir.Y>0){
                                defaults.wipeUp();
                            }else{
                                defaults.wipeDown();
                            };
                        }
                    });
                });
            })
        }
    });
})(jQuery);