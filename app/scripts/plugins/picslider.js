/**
 * Created by vita on 2018/8/7.
 */

$.fn.sliderLeftRight = (options) => {

	let _cur = 0;
	let ele = $('.'+options.className);

	let slideprev = ele.find('.arrow-prev');
	let slidenext = ele.find('.arrow-next');
	let sliderBtns = ele.find('.op-btn span');
	let sliderLoopBtn = ele.find('.switch-btn');
	let slider = ele.find('.picswitch-itmes');
	let sliderlen = ele.find('.picswitch-itmes li').length;

	let _W = ele.width();
	ele.find('.picswitch-itmes li').width(_W);
	slider.width(sliderlen*_W);

	slideprev.hover(()=> {
		$(this).removeClass('btnGrey').find('[class*="i-arrow-"]').removeClass('i-arrow-l1').addClass('i-arrow-l2');
	},()=> {
		$(this).addClass('btnGrey').find('[class*="i-arrow-"]').addClass('i-arrow-l1').removeClass('i-arrow-l2');
	});
	slidenext.hover(()=> {
		$(this).removeClass('btnGrey').find('[class*="i-arrow-"]').removeClass('i-arrow-r1').addClass('i-arrow-r2');
	},()=> {
		$(this).addClass('btnGrey').find('[class*="i-arrow-"]').addClass('i-arrow-r1').removeClass('i-arrow-r2');
	});
	sliderBtns.click(()=>{
		_cur = $(this).index();
		sliderPlay(_cur);
	});
	slideprev.click(()=>{
		sliderPrev();
	});
	slidenext.click(()=> {
		sliderNext();
	});
	sliderLoopBtn.click(()=> {
		sliderNext();
	});

	function sliderPlay(i) {
		sliderBtns.eq(i).addClass('active').siblings().removeClass('active');
		slider.stop(true).animate({
			left:-i*_W
		},300);
	}
	function sliderNext() {
		if(_cur>=sliderlen-1){
			_cur = -1;
		}
		sliderPlay(++_cur);
	}
	function sliderPrev() {
		if(_cur<=0){
			_cur = sliderlen;
		}
		sliderPlay(--_cur);
	}


	let startX, startY;
	function touchStart(event) {
		try {
			let touch = event.touches[0];
			let x = Number(touch.pageX);
			let y = Number(touch.pageY);
			startX = x;
			startY = y;
		} catch (e) {}
	}
	function touchEnd(event) {
		try {
			for (let i = 0; i < event.changedTouches.length; i++) {
				let ot = event.changedTouches[i];
				if (!ot) return;
				_cur = parseInt(Math.abs(slider.position().left/_W));
				let dx = startX - ot.clientX;
				if(dx>0){
					if(_cur<sliderlen-1){
						sliderPlay(++_cur);
					}
				}
				else{
					if(_cur>0){
						sliderPlay(--_cur);
					}
				}
			}
		} catch (e) {}
	}


	let touch=('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
	if(touch){
		ele.get(0).addEventListener('touchstart',touchStart,false);
		ele.get(0).addEventListener('touchend',touchEnd,false);
	}

	if(options.loop){
		let t=null;
		let timer=()=>{
			window.clearInterval(t);
			t=window.setInterval(()=>{
				if(_cur>=sliderlen-1){_cur=-1;}
				sliderPlay(++_cur);
			},options.speed);
		};
		timer();
		slider.hover(()=>{
			window.clearInterval(t);
		},()=>{
			timer();
		});
	}

}
