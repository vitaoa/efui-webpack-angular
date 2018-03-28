
// 自动左右轮播
var cArr=["li-3","li-2","li-1"];
var index=0;
var speed = 4000;
//上一张
function previmg(){
    cArr.unshift(cArr[2]);
    cArr.pop();
    $(".switch-block li").each(function(i,e){
        $(e).removeClass().addClass(cArr[i]);
    });
    index--;
    if (index<0) {
        index=2;
    };
}

//下一张
function nextimg(){
    cArr.push(cArr[0]);
    cArr.shift();
    $(".switch-block li").each(function(i,e){
        $(e).removeClass().addClass(cArr[i]);
    });
    index++;
    if (index>2) {
        index=0;
    };
};

//改变底下按钮的背景色
// function show(){
//     $($s).eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
// }

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

$(".switch-block").mouseover(function(){
    clearInterval(timer);
});
$(".switch-block").mouseleave(function(){
    timer=setInterval(nextimg,speed);
});
timer=setInterval(nextimg,speed);