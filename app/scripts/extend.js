/**
 * Created by vita on 2018/8/13.
 */

$.extend(
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
);