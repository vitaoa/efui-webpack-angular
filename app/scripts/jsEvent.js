/**
 * Created by vita on 2018/8/15.
 */
var jsEvent = {
	//添加事件
	addEventHandle:function(element,eventType,fn){
		if(element.addEventListener){
			element.addEventListener(eventType,fn,false);//非IE
		}else if(element.attachEvent){
			element.attachEvent('on'+eventType,fn);//IE，这里拼接上'on',调用的时候不要加on，使用click等。
		}else{
			//不支持DOM2级，使用DOM0级方式
			element['on'+eventType] = fn;//这里使用[]方式实现对象的属性添加，相当于.的作用
		}
	},
	//删除事件
	removeEventHandle:function(element,eventType,fn){
		if(element.removeEventListener){//非IE,不带'on'
			element.removeEventListener(eventType,fn,false);//这里传入fn，是因为DOM2级或DOM0级都可以一次给一个元素的同一个事件绑定多个程序，所以需要传入具体的程序fn进行删除
		}else if(element.detachEvent){
			element.detachEvent('on'+eventType,fn);//IE,带'on'
		}else{
			element['on'+eventType] = fn;//不支持DOM2级，使用DOM0级方式
		}
	},
	//获取事件对象
	getEvent:function(event){
		return event?evt:window.event;
	},
	//获取事件类型
	getType:function(event){
		return event.type;
	},
	//获取执行事件的目标元素
	getTarget:function(event){
		return event.target||event.srcElement;
	},
	//禁用默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();//非IE
		}else{
			event.returnValue = false;//针对IE
		}
	},
	//阻止传播冒泡
	stopPropagation:function(event){
		if(event.stopPrapagation){
			event.stopPropagation();//非IE
		}else{
			event.cancelBubble = true;//针对IE
		}
	}
};

var div = document.getElementsByTagName('div')[0];
var a = document.getElementsByTagName('a')[0];
jsEvent.addEventHandle(div,'click',function(e){
	e = jsEvent.getEvent(e);
	alert("给div增加的事件");
	alert("事件执行的对象是："+jsEvent.getTarget(e).nodeName);
	alert("事件类型是："+jsEvent.getType(e));
});
jsEvent.addEventHandle(a,'click',function(e){
	e = jsEvent.getEvent(e);
	alert("给a增加的事件");
	alert("事件执行的对象是："+jsEvent.getTarget(e).nodeName);
	alert("事件类型是："+jsEvent.getType(e));
	//事件冒泡和默认行为处理
	jsEvent.preventDefault(e);//禁止默认行为
	jsEvent.stopPropagation(e);//停止传播冒泡
});