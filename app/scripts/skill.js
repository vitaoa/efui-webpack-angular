/**
 * Created by vita on 2018/4/11.
 */
+(function($) {
    'use strict';

    $.fn.extend({
        testClick: function () {
            console.log($(this));
        }
    });

})(jQuery);

var checkType=(function(){
    var rules={
        email(str){
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        },
        mobile(str){
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        },
        tel(str){
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        },
        number(str){
            return /^[0-9]$/.test(str);
        },
        english(str){
            return /^[a-zA-Z]+$/.test(str);
        },
        text(str){
            return /^\w+$/.test(str);
        },
        chinese(str){
            return /^[\u4E00-\u9FA5]+$/.test(str);
        },
        lower(str){
            return /^[a-z]+$/.test(str);
        },
        upper(str){
            return /^[A-Z]+$/.test(str);
        }
    };
    //暴露接口
    return function (str,type){
        console.log(type.constructor);
        //如果type是函数，就扩展rules，否则就是验证数据
        if(type.constructor===Function){
            rules[str]=type;
        }
        else{
            return rules[type]?rules[type](str):false;
        };
        // //校验
        // check(str, type){
        //     return rules[type]?rules[type](str):false;
        // },
        // //添加规则
        // addRule(type,fn){
        //     rules[type]=fn;
        // }
    }
})();

//调用方式
// //使用mobile校验规则
// console.log(checkType('188170239','mobile'));
// //添加金额校验规则
// checkType('money',function (str) {
//     return /^[0-9]+(.[0-9]{2})?$/.test(str)
// });
// //使用金额校验规则
// console.log(checkType('18.36','money'));



