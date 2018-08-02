
+(function($) {
    'use strict';

    $.fn.extend({
        //手机号码格式化
        formatPhone:function () {
            var regFormatPhone = /(^(\d{3})|(\d{4}))(?=[^\s])/g;
            $(this).keyup(function () {
                this.value = this.value.replace(/[^\s\d]/g,'').replace(regFormatPhone,"$1 ");
            });
            $(this).text($.trim($(this).text()).replace(regFormatPhone,"$1 "));
        },
        //身份证格式化
        formatCertificate:function () {
            var regCertificate = /(^(\d{6}))(?=[^\s])/g;
            var regCertificate2 = /((\d{4}))(?=[^\s])/g;
            $(this).keyup(function() {
                var _keepval='';
                if(this.value.length>6){
                    this.value = this.value.replace(/[^\s\d]/g,'').replace(regCertificate,"$1 ");
                }
                if(this.value.length>7){
                    var _newval = this.value.substring(7,this.value.length);
                    _keepval = this.value.substring(0,7);
                    _newval = _newval.replace(/[^\s\d]/g,'').replace(regCertificate2,"$1 ");
                    this.value = _keepval + _newval;
                }
            });
            var _keeptxt = $.trim($(this).text()).replace(regCertificate,"$1 ");
            var _lasttxt = _keeptxt.substring(7,$.trim($(this).text()).length).replace(regCertificate2,"$1 ");
            $(this).text(_keeptxt.substring(0,7)+_lasttxt);
        },
        //验证手机号码
        mobilePhoneVerify:function () {
            var objVal = $(this).val();
            if(checkVerify(objVal.replace(/\s/g,""),'mobile')){
                return true;
            }
            else{
                return false;
            }
        },
        //验证验证码
        vCodeVerify:function() {
            var objVal = $(this).val();
            checkVerify('vcode',function (str) {
                return /^\d{4}$/.test(str);
            });
            if(checkVerify(objVal.replace(/\s/g,""),'vcode')){
                return true;
            }
            else{
                return false;
            }
        },
        //验证密码
        passwordVerify:function() {
            var objVal = $(this).val();
            checkVerify('password',function (str) {
                return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(str);
            });
            if(checkVerify(objVal,'password')){
                return true;
            }
            else{
                return false;
            }
        },
        //验证码倒计时
        settime:function(countdown) {
            var _this = this.get(0);
            if (countdown === 0) {
                _this.removeAttribute("disabled");
                _this.value="获取验证码";
                $(_this).css('color','#4992c9');
            } else {
                _this.setAttribute("disabled", true);
                _this.value="重新发送(" + countdown + ")";
                $(_this).css('color','#7e7e7e');
                countdown--;
                setTimeout(function() {$(_this).settime(countdown)},1000)
            }
        },
        //keyup
        mobilePhoneKeyup:function () {
            $(this).inputKeyup();
            //长度检测
            var objRoot = $(this).closest('.form-listbox');
            var _maxlength = $(this).val().replace(/[\s]/g,'');
            if(_maxlength.length>11){
                objRoot.addClass('overlength');
            }
            else{
                objRoot.removeClass('overlength');
                if(_maxlength.length===11 && $(this).mobilePhoneVerify()){
                    $(this).correctTips();
                }
                else{
                    $(this).errorTips();
                }
            }
        },
        checkCodeKeyup:function () {
            $(this).inputKeyup();
            if($(this).vCodeVerify()){
                $(this).correctTips();
            }
            else{
                $(this).errorTips();
            }
        },
        passwordKeyup:function () {
            $(this).inputKeyup();
            arguments.length && $(arguments[0]).val($(this).val());
        },
        inputKeyup:function () {$(this).closest('.form-listbox');
            var objRoot = $(this).closest('.form-listbox');
            objRoot.siblings('.form-listbox').addClass('inputted');
            objRoot.addClass('inputting');
        },
        //focus
        mobilePhoneFocus:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputFocus(objRoot);
        },
        checkCodeFocus:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputFocus(objRoot);
        },
        passwordFocus:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputFocus(objRoot);
        },
        inputFocus:function (objRoot) {
            objRoot.find('.border-active').addClass('border-actived');
            objRoot.addClass('actived');
        },
        //blur
        mobilePhoneBlur:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputBlur($(this).val(),objRoot);
            if(!$(this).mobilePhoneVerify()){
                $(this).errorTips();
            }
        },
        checkCodeBlur:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputBlur($(this).val(),objRoot);
            if(!$(this).vCodeVerify()){
                $(this).errorTips();
            }
        },
        passwordBlur:function () {
            var objRoot = $(this).closest('.form-listbox');
            $(this).inputBlur($(this).val(),objRoot);
            if($(this).passwordVerify()){
                $(this).correctTips();
            }
            else{
                $(this).errorTips();
            }
        },
        inputBlur:function (val,objRoot) {
            objRoot.find('.border-active').removeClass('border-actived');
            objRoot.removeClass('actived');
            objRoot.removeClass('inputting inputted');
            !!(val) && objRoot.addClass('actived');
        },
        errorTips:function () {
            var objRoot = $(this).closest('.form-listbox');
            objRoot.addClass('inputError').removeClass('inputCorrect');
        },
        correctTips:function () {
            var objRoot = $(this).closest('.form-listbox');
            objRoot.addClass('inputCorrect').removeClass('inputError');
        },
        //submit
        submitInit:function () {
            if($('#mobilePhone_number').mobilePhoneVerify()){
                if($('#checkCode').vCodeVerify()){
                    if($('#passwordRaw').passwordVerify()){
                        console.log('success !!!');
                    }
                    else{
                        $('#passwordRaw').focus();
                        $('#passwordRaw').errorTips();
                    }
                }
                else{
                    $('#checkCode').focus();
                    $('#checkCode').errorTips();
                }
            }
            else{
                $('#mobilePhone_number').focus();
                $('#mobilePhone_number').errorTips();
            }
        },
	    sendCodeNumber:function () {
		    $('#mobilePhone_number').mobilePhoneVerify() && $('#checkCode').focus() && $(this).settime(59);
	    },
	    setImagePreview:function() {
			var docObj = $(this).find("input[type='file']");
			var fileName = docObj.value;
			if (!fileName.match(/.jpg|.gif|.png|.bmp/i)) {
				alert('您上传的图片格式不正确，请重新选择！');
				return false;
			}

			var imgObjPreview = document.getElementById("preview");
			if (docObj.files && docObj.files[0]) {//火狐下，直接设img属性
				imgObjPreview.style.display = 'block';
				imgObjPreview.style.width = '63px';
				imgObjPreview.style.height = '63px';
				//imgObjPreview.src = docObj.files[0].getAsDataURL();
				if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
					imgObjPreview.src = window.webkitURL.createObjectURL(docObj.files[0]);
				}
				else {
					imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
				}
			} else {//IE下，使用滤镜
				docObj.select();
				docObj.blur();
				var imgSrc = document.selection.createRange().text;
				var localImagId = document.getElementById("localImag");//必须设置初始大小
				localImagId.style.width = "63px";
				localImagId.style.height = "63px";//图片异常的捕捉，防止用户修改后缀来伪造图片
				try {
					localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
				} catch (e) {
					alert("您上传的图片格式不正确，请重新选择！");
					return false;
				}
				imgObjPreview.style.display = 'none';
				document.selection.empty();
			}
			return true;
		},
    });
})(jQuery);

window.onload = function() {
    //ios :active
    var a=document.getElementsByTagName('a');
    for(var i=0;i<a.length;i++){
        a[i].addEventListener('touchstart',function(e){},false);
    }
    //pop click
    $('body>*').bind('click',function(e){
        var _target = $(e.target);
        !_target.closest('.pop-code').length && !_target.closest('.Popup').length && _target.closest('.Blackbg').hide();
        _target.closest('.submit-pop').length && !_target.closest('.wrong-icon').length && _target.closest('.submit-pop').hide() && (
            ($('.border-active.inp-wrong').find('.i-text').length && $("#"+$('.border-active.inp-wrong').find('.i-text').attr('id')).focus()),
                (!$('.border-active.inp-wrong').find('.i-text').length && $("#"+$('.border-active.inp-wrong').attr('id')).focus())
        );
    });

    //checkbox
    $('.i-checkbox').each(function () {
        var checkStatus = $(this).parent().find('input[type="checkbox"]').prop('checked');
        checkStatus && $(this).parent().addClass('checkdbox');
        $(this).click(function () {
            $(this).parent().toggleClass('checkdbox');
            $(this).parent().find('input[type="checkbox"]').prop('checked',!checkStatus);
        });
    });


};

var checkVerify=(function(){
    var rules={
        // email(str){
        //     return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        // },
        // mobile(str){
        //     return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        // },
        // tel(str){
        //     return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        // },
        // number(str){
        //     return /^[0-9]$/.test(str);
        // },
        // english(str){
        //     return /^[a-zA-Z]+$/.test(str);
        // },
        // text(str){
        //     return /^\w+$/.test(str);
        // },
        // chinese(str){
        //     return /^[\u4E00-\u9FA5]+$/.test(str);
        // },
        // lower(str){
        //     return /^[a-z]+$/.test(str);
        // },
        // upper(str){
        //     return /^[A-Z]+$/.test(str);
        // }
    };
    //暴露接口
    return function (str,type){
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
// console.log(checkVerify('188170239','mobile'));
// //添加金额校验规则
// checkVerify('money',function (str) {
//     return /^[0-9]+(.[0-9]{2})?$/.test(str)
// });
// //使用金额校验规则
// console.log(checkVerify('18.36','money'));


//
// console.log(checkVerify('188170239','mobile'));