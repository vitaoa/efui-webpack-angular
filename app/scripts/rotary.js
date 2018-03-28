
// 九宫格抽奖
var hitprize = ["gift2","gift3","gift5","gift7"];
var lottery={
    index:-1,    //当前转动到哪个位置，起点位置
    count:0,    //总共有多少个位置
    timer:0,    //setTimeout的ID，用clearTimeout清除
    speed:20,    //初始转动速度
    times:0,    //转动次数
    cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,    //中奖位置
    init:function(id){
        if ($("#"+id).find(".lottery-unit").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
    },
    stop:function(index){
        this.prize=index;
        return false;
    }
};

function roll(){
    lottery.times += 1;
    lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize=-1;
        lottery.times=0;
        var _currentPrize = String($('.rotary-draw .rotary-con .lottery-unit.active').find('i').attr('class'));

        if($.inArray(_currentPrize, hitprize)>=0){
            $('.getWinning').show();
            $('.status-'+_currentPrize).show();
        }
        else{
            console.log($('#rotaryTimes').text());
            if(parseInt($('#rotaryTimes').text())>0)$('.noprivilege').show();
            else $('.notWinning').show();
        }
        // $(".m-rule").siblings(":not(.m-bg-mask,link,script)").css({
        //     "filter": "blur(5px)",
        //     "-webkit-filter": "blur(5px)"
        // });
        click=false;
    }else{
        if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
        }else if(lottery.times==lottery.cycle) {
            var index = Math.random()*(lottery.count)|0;//中奖物品通过一个随机数生成
            lottery.prize = index;
        }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                lottery.speed += 110;
            }else{
                lottery.speed += 20;
            }
        }
        if (lottery.speed<40) {
            lottery.speed=40;
        };
        //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll,lottery.speed);//循环调用
    }
    return false;
}

var click=false;

window.onload=function(){
    lottery.init('lottery');
    $("#lottery .lottery-btn").click(function(){
        var _restTimes =  parseInt($('#rotaryTimes').text());
        if (click || _restTimes < 1) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            return false;
        }else{
            if(_restTimes < 1)return false;
            $('.mask').addClass('over');
            $('#rotaryTimes').text(_restTimes-1);
            lottery.speed=100;
            roll();    //转圈过程不响应click事件，会将click置为false
            click=true; //一次抽奖完成后，设置click为true，可继续抽奖
            return false;
        }
    });

    // 关闭弹层
    $('.PopupCloseBtn').click(function () {
        $(this).closest('.PopupLayer').hide();
        $('.mask').removeClass('over');
        $(".m-rule").siblings().css({
            "filter": "blur(0px)",
            "-webkit-filter": "blur(0px)"
        });
    });
};


// 转盘抽奖