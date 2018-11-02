/**
 * Created by vita on 2018/8/25.
 */

(function ($) {
    var coordinate={
        X:0,
        Y:0,
    };
    var direction={
        X:0,
        Y:0,
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

                            direction.X=dx;
                            direction.Y=dy;
                        }
                    } catch (e) {
                        console.log(e.message)
                    }
                    break;
                case "touchmove":
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

                        direction.X=dx;
                        direction.Y=dy;
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
                wipeLeft:function(){},
                wipeRight:function(){},
                wipeUp:function(){},
                wipeDown:function(){},
                mouseEvents:true,
            };
            options && $.extend(defaults,options);

            return this.each(function () {
                var supportTouch = "ontouchstart" in document;
                var Events = [];
                var moveEvent = supportTouch ? "touchmove" : "mousemove",
                    startEvent = supportTouch ? "touchstart" : "mousedown",
                    endEvent = supportTouch ? "touchend" : "mouseup",
                    cancelEvent = supportTouch ? "touchcancel" : "mouseout";
                Events.push(moveEvent,startEvent,endEvent,cancelEvent);

                Events.forEach(function(eventName) {
                    addEventHandle($(defaults.element).get(0),eventName,function (event) {
                        var _dir = handleEvent(event);
                        if(defaults.mouseEvents){
                            if(eventName=='touchend' || eventName=='mouseup'){
                                wipeFun(_dir);
                            }
                        }else{
                            if(eventName=='touchend'){
                                wipeFun(_dir);
                            }
                        }
                    });
                });
            });
            function wipeFun(_dir) {
                // console.log(swipeDirection(_dir))
                if(Math.abs(_dir.X) >= Math.abs(_dir.Y)){
                   // console.log(_dir.X)
                    if(_dir.X > 0){
                        defaults.wipeLeft();
                    }else if(_dir.X < 0){
                        defaults.wipeRight();
                    }
                }else{
                    if(_dir.Y > 0){
                        defaults.wipeUp();
                    }else if(_dir.Y < 0){
                        defaults.wipeDown();
                    }
                }
            }

            function swipeDirection(_dir) {
                return Math.abs(_dir.X) >= Math.abs(_dir.Y) ? (_dir.X > 0 ? 'Left' : 'Right') : (_dir.Y > 0 ? 'Up' : 'Down')
            }
        }
    });
})(jQuery);