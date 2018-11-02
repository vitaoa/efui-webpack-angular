/**
 * Created by Administrator on 2018/7/31 0031.
 */
/**
 * 以下是完整的用户代理字符串检测脚本，包括检测呈现引擎、平台、windows操作系统、移动设备和游戏系统
 */
var client = function(){
    //呈现引擎
    var engine={
        ie:0,
        gecko:0,
        webkit:0,
        khtml:0,
        opera:0,
        //完整的版本号
        ver: null
    };
    //浏览器
    var browser={
        //主要浏览器
        ie:0,
        firefox:0,
        safari:0,
        konq:0,
        opera:0,
        chrome:0,
        //具体的版本号
        ver:null
    };
    //平台、设备和操作系统
    var system={
        win:false,
        mac:false,
        xll:false,

        //移动设备
        iphone:false,
        ipod:false,
        ipad:false,
        ios:false,
        andriod:false,
        nokiaN:false,
        winMobile:false,

        //游戏系统
        wii:false,
        ps:false
    };
    //检测呈现引擎和浏览器
    var ua=navigator.userAgent;
    if(window.opera){
        engine.ver=browser.ver=window.opera.version();
        engine.opera=browser.opera=parseFloat(engine.ver);
    }else if(/AppleWebkit\/(\S+)/i.test(ua)){
        engine.ver=RegExp["$1"];//RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
        engine.webkit=parseFloat(engine.ver);
        //确定是chrome还是Safari
        if(/chrome\/(\S+)/.test(ua)){
            browser.ver=RegExp["$1"];
            browser.chrome=parseFloat(browser.ver);
        }else if(/Version\/(\S+)/.test(ua)){
            browser.ver=RegExp["$1"];
            browser.safari=parseFloat(browser.ver);
        }else{
            //近似的确定版本号
            var safariVersion=1;
            if(engine.webkit<100){
                safariVersion=1;
            }else if(engine.webkit<312){
                safariVersion=1.2;
            }else if(engine.webkit<412){
                safariVersion=1.3;
            }else{
                safariVersion=2;
            }
            browser.safari=browser.ver=safariVersion;
        }
    }else if(/KHTML\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
        engine.ver=browser.ver=RegExp["$1"];
        engine.khtml=browser.konq=parseFloat(engine.ver);
    }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.ver=RegExp["$1"];
        engine.gecko=parseFloat(engine.ver);

        //确定是不是Firefox
        if(/Firefox\/(S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
         }
        }else if(/MSIE ([^;]+)/.test(ua)){
            engine.ver=RegExp["$1"];
            engine.ie=browser.ie=parseFloat(engine.ver);
        }

        //检测浏览器
        browser.ie=engine.ie;
        browser.opera=engine.opera;

        //检测平台
        var p=navigator.platform;
        system.win=p.indexOf("Win")==0;
        system.mac=p.indexOf("Mac")==0;
        system.xll=(p=="xll")||(p.indexOf("Linux")==0);

        //检测Windows操作系统
        if(system.win){
            if(/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
                if(RegExp["$1"]=="NT"){
                    switch (RegExp["$2"]){
                        case"5.0":
                            system.win="2000";
                            break;
                        case "5.1":
                            system.win="XP";
                            break;
                        case "6.0":
                            system.win="Vista";
                            break;
                        case "6.1":
                            system.win="7";
                            break;
                        default:
                            system.win="NT";
                            break;
                    }
                }else if(RegExp["$1"]=="9x"){
                    system.win="ME";
                }else{
                    system.win=RegExp["$1"];
                }
            }
        }
        //移动设备
        system.iphone=ua.indexOf("iphone")>1;
        system.ipod=ua.indexOf("ipod")>-1;
        system.ipad=ua.indexOf("ipad")>-1;
        system.nokiaN=ua.indexOf("nokiaN")>-1;

        //windows mobile
        if(system.win=="CE"){
            system.winMobile=system.win;
        }else if(system.win=="Ph"){
            if(/Windows Phone OS(\d+.\d+)/.test(ua) ){
                system.win="phone";
                system.winMobile=parseFloat(RegExp["$1"]);
            }
        }

        //检测IOS版本
        if(system.mac && ua.indexOf("Mobile")>-1){
            if(/CPU(?:iphone)?OS(\d+_\d+)/.test(ua)){
                system.ios=parseFloat(RegExp.$1.replace("_","."));
            }else{
                system.ios=2;//不能真正检测出来，所以只能猜测
            }
        }

        //检测Android版本
        if(/Android(\d+\.\d+)/.test(ua)){
            system.andriod=parseFloat(RegExp.$1);
        }

        //游戏系统
        system.wii=ua.indexOf("Wii")>-1;
        system.ps=/playstation/i.test(ua);

        return{
            ua:ua,
            engine:engine,
            browser:browser,
            sysytem:system
        };
}();
console.log(client);
