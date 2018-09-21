/**
 * Created by vita on 2018/8/13.
 */

$.extend(
	toggle = function (op) {
		/* *
		 * @dom:event element
		 * @wrap:parent
		 * @close:close class
		 * */
		if(op.dom){
			$(op.dom).click(function(){
				$(op.wrap).show();
			});
		}
		$(op.close).click(function(){
			$(op.wrap).hide();
		});
	},
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
	tabSwitch = function (options) {
		/* *
		* @wrap:parent
		* @nav:events
		* @panel:switch
		* */
		$(options.nav).click(function(){
			var _index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$(this).closest(options.wrap).find(options.panel).eq(_index).addClass('active').siblings(options.panel).removeClass('active');
		});
	},
    isFunction = function(func){
        return type(func)=='function';
    },
);