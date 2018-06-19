/**
 * Created by vita on 2018/6/7.
 */


+(function($) {
	'use strict';

	var cx=200,cy=200,r=80;
	$.fn.extend({
		baseCanvas: function () {
			var oI = $(this).attr('id');
			var objC=document.getElementById(oI).getContext("2d");
			objC.fillStyle='red';
			objC.fillRect(0, 0, 200, 200);
			objC.save();
			objC.fillStyle="#fff";
			objC.font="14px/1 Arial";
			objC.fillText('左上角是（0，0）',0,14);
			objC.fillText('x=200',200,14);
			objC.fillText('y=200',0,200);
			objC.translate(50,50);
			objC.fillRect(0, 0, 200, 200);
			objC.restore();
			objC.font="14px/1 Arial";
			objC.fillText('translate(50,50)',50,64);
		},
		circleCanvas:function () {
			var oI = $(this).attr('id');

			var oC=document.getElementById(oI);
			var gd=oC.getContext("2d");

			gd.beginPath();
			gd.arc(cx,cy,r,1.5*Math.PI,Math.PI/2,false);
			gd.fillStyle='yellow';
			gd.closePath();
			gd.fill();
			gd.beginPath();
			gd.arc(cx,cy,r,Math.PI/2,1.5*Math.PI,false);
			gd.fillStyle="black";
			gd.closePath();
			gd.fill();
			//
			gd.beginPath();
			gd.arc(cx,cy+r/2,r/2,0,Math.PI*2,true);
			gd.fillStyle="yellow";
			gd.closePath();
			gd.fill();
			gd.beginPath();
			gd.arc(cx,cy-r/2,r/2,0,Math.PI*2,true);
			gd.fillStyle="black";
			gd.closePath();
			gd.fill();
//
			gd.beginPath();
			gd.arc(cx,cy-r/2,5,0,Math.PI*2,true);
			gd.fillStyle="yellow";
			gd.closePath();
			gd.fill();
			gd.beginPath();
			gd.arc(cx,cy+r/2,5,0,Math.PI*2,true);
			gd.fillStyle="black";
			gd.closePath();
			gd.fill();

			gd.save();
			gd.fillStyle="black";
			gd.globalAlpha="0.4";
			gd.textAlign="center";
			gd.font="32px Arial";
			gd.shadowColor="rgba(0,0,0,0.4)";
			gd.shadowOffsetX=15;
			gd.shadowOffsetY=-10;
			gd.shadowBlur=2;
			gd.fillText('6个圆组成的八卦图',200,100);//IE不支持

			gd.restore();
		},
		circleLineCanvas:function () {
			var oI = $(this).attr('id');
			var oC2=document.getElementById(oI);
			var gd2=oC2.getContext("2d");
			gd2.fillStyle='red';
			// gd2.beginPath();
			// gd2.arc(300,100,30,0,2*Math.PI,true);
			// gd2.closePath();
			// gd2.fill();
			setInterval(function(){
				run(gd2);
			}, 50);
			var speed=0;
			var startPoint=oC2.width;
			function run(cxt){
				speed=-7;
				cxt.clearRect(0,0,oC2.width,oC2.height);
				startPoint+=speed;
				if(startPoint<=0){
					startPoint=oC2.width;
				}
				cxt.beginPath();
				cxt.arc(startPoint,100,30,0,2*Math.PI,true);
				cxt.closePath();
				cxt.fill();
			}
		},
		circleRoundCanvas:function () {
			var oI = $(this).attr('id');
			var oC3=document.getElementById(oI);
			var gd3=oC3.getContext("2d");
			drawNotChange(gd3);

			// gd3.fillStyle='blue';
			// gd3.beginPath();
			// gd3.arc(cx,cy+r,30,0,2*Math.PI,true);
			// gd3.closePath();
			// gd3.fill();
			setInterval(function(){
				runRound(gd3);
			}, 50);

			var time=0;//定义运动的执行次数
			function runRound(cxt){
				cxt.clearRect(0,0,oC3.width,oC3.height);
				drawNotChange(cxt);
				cxt.save();//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
				cxt.translate(cx,cy);
				cxt.rotate(time*9*Math.PI/180);//设定每次旋转的度数
				cxt.fillStyle='blue';
				cxt.beginPath();
				cxt.arc(0,2*r,30,0,2*Math.PI,true);
				cxt.closePath();
				cxt.fill();
				cxt.restore();//将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
				time+=1;
			}
			//绘制不变因素
			function drawNotChange(context){
				context.fillStyle='red';
				context.beginPath();
				context.arc(cx,cy,30,0,2*Math.PI,true);
				context.closePath();
				context.fill();
				context.beginPath();
				context.arc(cx,cy,2*r,0,2*Math.PI,true);
				context.closePath();
				context.stroke();
			}
		},
		canvasBezier:function () {
			var oI = $(this).attr('id');
			draw(oI);
			function draw(id) {
				var canvas = document.getElementById(id);
				if (canvas.getContext) {
					var ctx = canvas.getContext('2d');

					// Quadratric curves example
					ctx.beginPath();
					ctx.moveTo(75,25);
					ctx.quadraticCurveTo(25,25,25,62.5);
					ctx.quadraticCurveTo(25,100,50,100);
					ctx.quadraticCurveTo(50,120,30,125);
					ctx.quadraticCurveTo(60,120,65,100);
					ctx.quadraticCurveTo(125,100,125,62.5);
					ctx.quadraticCurveTo(125,25,75,25);
					ctx.fill();
				}
			}

		},
	});

})(jQuery);
