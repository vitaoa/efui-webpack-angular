/**
 * Created by vita on 2018/4/8.
 */

    angular.module('evApp.controller', [])
        .controller('elementController',function ($scope,$sce) {
	        $scope.docsTit = "基本元素";
	        $scope.docsMsg = "CSS样式、HTML标签";
	        $scope.trustAsHtml = function(html) {
		        return $sce.trustAsHtml(html);
	        };
            $scope.menulist = [
	            {"headmenu":"CSS　样式","menulist":[
		            {'title':"样式统一",'url':"normalize"},
		            {'title':"网页布局",'url':"layout"},
		            {'title':"文字排版",'url':"publish"},
		            {'title':"字体图标",'url':"font"}
                ]},
	            {"headmenu":"HTML 标签","menulist":[
		            {'title':"按钮 <span>Button</span>",'url':"button"},
		            {'title':"代码 <span>Code</span>",'url':"code"},
		            {'title':"表单 <span>Form</span>","submenu":[
			            {'name':"- input",'url':"input"},
			            {'name':"- textarea",'url':"textarea"},
			            {'name':"- select",'url':"select"}
                    ]},
		            {'title':"表格 <span>Table</span>",'url':"table"},
		            {'title':"图片 <span>Image</span>",'url':"image"}
                ]}
            ];
        })
        .controller('animationController',['$scope',function ($scope) {
	        $scope.docsTit = "css 动画";
	        $scope.docsMsg = "CSS3 Transitions, Transforms和Animation使用简介与应用展示";
	        $scope.baseCanvas = function (id) {
                  $(id).baseCanvas();
	        };
	        $scope.circleCanvas=function (id) {
		        $(id).circleCanvas();
	        };
	        $scope.circleLineCanvas=function (id) {
              $(id).circleLineCanvas();
	        };
	        $scope.circleRoundCanvas=function (id) {
                $(id).circleRoundCanvas();
	        };
	        $scope.canvasBezier=function (id) {
              $(id).canvasBezier();
	        };
        }])
        .controller('pluginController', ['$scope' ,function($scope) {
            $scope.docsTit = "插件";
            $scope.docsMsg = "基于jQuery库的插件介绍";
            $scope.countTo = function(o){
                var $this = $(o);
                $this.each(function (a) {
                    $(this).data("countToOptions", {
                        formatter: function(b, a) {
                            return b.toFixed(0).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")
                        }
                    });
                    a = $.extend({},a || {},$(this).data("countToOptions") || {});
                    $(this).countTo(a);
                });
            };
            $scope.txtTyping = function (a) {
	            a = $.extend({},a || {});
	            $(this).txtTyping(a);
            }
            $scope.squareDrawInit = function (id,hitprize) {
                $(this).squareDraw({
                    objId:id,
                    eventObj:".lottery-btn",
                    hitprize:hitprize
                });
            };
            $scope.rotaryDrawInit = function (id) {
                $(this).rotaryDraw({
                    objId:id
                });
            };
            $scope.carouselLeftRight = function (a) {
                a = $.extend({},a || {});
                $(this).carouselLeftRight(a);
            };
            $scope.infosPlayAuto = function (i,ele,time) {
                var curIndex = i;
                var timeInterval = time;
                var _obj = $(ele);
                setInterval(changeinfos,timeInterval);
                function changeinfos() {
                    if (curIndex == _obj.length-1) {
                        curIndex = 0;
                    } else {
                        curIndex += 1;
                    }
                    _obj.eq(curIndex).fadeIn().siblings().fadeOut();
                }
            };
            $scope.eachOneScrollUp = function (ele,time) {
                var timeInterval = time;
                var _obj = $(ele),
                    scrollTimer;
                _obj.hover(function(){
                    clearInterval(scrollTimer);
                },function(){
                    scrollTimer = setInterval(function(){
	                    scrollList(_obj);
                    },timeInterval);
                }).trigger("mouseout");
                function scrollList(obj){
                    var $self = obj.find("ul:first");
                    var lineHeight = $self.find("li:first").outerHeight(true);
                    $self.animate({ "top" : -lineHeight +"px" },600 , function(){
                        $self.css({"top":"0px"}).find("li:first").appendTo($self);
                    })
                }
            };
            $scope.eachOneScrollLeft = function (ele,time) {
                var timeInterval = time;
                var _obj = $(ele),
                    scrollTimer;
                _obj.hover(function(){
                    clearInterval(scrollTimer);
                },function(){
                    scrollTimer = setInterval(function(){
                        scrollNews(_obj);
                    },timeInterval);
                }).trigger("mouseout");
                function scrollNews(obj){
                    var $self = obj.find("ul:first");
                    var lineWidth = $self.find("li:first").outerWidth(true);
                    $self.animate({ "left" : -lineWidth +"px" },600 , function(){
                        $self.css({"left":"0px"}).find("li:first").appendTo($self);
                    })
                }
            };
            $scope.marqueeScrollUp = function (a) {
                a = $.extend({}, a || {});
                var speed = a.speed;

                var tab = document.getElementById(a.cArr[0]);
                var tab1 = document.getElementById(a.cArr[1]);
                var tab2 = document.getElementById(a.cArr[2]);

                tab2.innerHTML=tab1.innerHTML;

                function Marquee(){
                    if(tab2.offsetHeight-tab.scrollTop<=0)
                        tab.scrollTop-=tab1.offsetHeight;
                    else{
                        tab.scrollTop++;
                    }
                }
                var MyMar=setInterval(Marquee,speed);
                tab.onmouseover=function() {clearInterval(MyMar)};
                tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
            };
            $scope.marqueeScrollLeft = function (a) {
                a = $.extend({}, a || {});
                var speed = a.speed;

                var tab = document.getElementById(a.cArr[0]);
                var tab1 = document.getElementById(a.cArr[1]);
                var tab2 = document.getElementById(a.cArr[2]);

                tab2.innerHTML=tab1.innerHTML;

                function Marquee(){
                    if(tab2.offsetWidth-tab.scrollLeft<=0)
                        tab.scrollLeft-=tab1.offsetWidth;
                    else{
                        tab.scrollLeft++;
                    }
                }
                var MyMar=setInterval(Marquee,speed);
                tab.onmouseover=function() {clearInterval(MyMar)};
                tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
            };
            $scope.initPhotoSwipeFromDOM = function(gallerySelector) {
                console.log(gallerySelector);

                // parse slide data (url, title, size ...) from DOM elements
                // (children of gallerySelector)
                var parseThumbnailElements = function(el) {
                    var thumbElements = el.childNodes,
                        numNodes = thumbElements.length,
                        items = [],
                        figureEl,
                        linkEl,
                        size,
                        item;

                    for (var i = 0; i < numNodes; i++) {

                        figureEl = thumbElements[i]; // <figure> element

                        // include only element nodes
                        if (figureEl.nodeType !== 1) {
                            continue;
                        }

                        linkEl = figureEl.children[0]; // <a> element


                        size = linkEl.getAttribute('data-size').split('x');

                        // create slide object
                        item = {
                            src: linkEl.getAttribute('href'),
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };


                        if (figureEl.children.length > 1) {
                            // <figcaption> content
                            item.title = figureEl.children[1].innerHTML;
                        }

                        if (linkEl.children.length > 0) {
                            // <img> thumbnail element, retrieving thumbnail url
                            item.msrc = linkEl.children[0].getAttribute('src');
                        }

                        item.el = figureEl; // save link to element for getThumbBoundsFn
                        items.push(item);
                    }

                    return items;
                };

                // find nearest parent element
                var closest = function closest(el, fn) {
                    return el && (fn(el) ? el : closest(el.parentNode, fn));
                };

                // triggers when user clicks on thumbnail
                var onThumbnailsClick = function(e) {
                    e = e || window.event;
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;

                    var eTarget = e.target || e.srcElement;

                    // find root element of slide
                    var clickedListItem = closest(eTarget, function(el) {
                        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                    });

                    if (!clickedListItem) {
                        return;
                    }

                    // find index of clicked item by looping through all child nodes
                    // alternatively, you may define index via data- attribute
                    var clickedGallery = clickedListItem.parentNode,
                        childNodes = clickedListItem.parentNode.childNodes,
                        numChildNodes = childNodes.length,
                        nodeIndex = 0,
                        index;

                    for (var i = 0; i < numChildNodes; i++) {
                        if (childNodes[i].nodeType !== 1) {
                            continue;
                        }

                        if (childNodes[i] === clickedListItem) {
                            index = nodeIndex;
                            break;
                        }
                        nodeIndex++;
                    }

                    if (index >= 0) {
                        // open PhotoSwipe if valid index found
                        openPhotoSwipe(index, clickedGallery);
                    }
                    return false;
                };

                // parse picture index and gallery index from URL (#&pid=1&gid=2)
                var photoswipeParseHash = function() {
                    var hash = window.location.hash.substring(1),
                        params = {};

                    if (hash.length < 5) {
                        return params;
                    }

                    var vars = hash.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        if (!vars[i]) {
                            continue;
                        }
                        var pair = vars[i].split('=');
                        if (pair.length < 2) {
                            continue;
                        }
                        params[pair[0]] = pair[1];
                    }

                    if (params.gid) {
                        params.gid = parseInt(params.gid, 10);
                    }

                    return params;
                };

                var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                    var pswpElement = document.querySelectorAll('.pswp')[0],
                        gallery,
                        options,
                        items;

                    items = parseThumbnailElements(galleryElement);
                    // define options (if needed)
                    options = {
                        // define gallery index (for URL)
                        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                        getThumbBoundsFn: function(index) {
                            console.log("index:")
                            console.log(index)
                            console.log(items[index].el.getElementsByTagName('img'))
                            // See Options -> getThumbBoundsFn section of documentation for more info
                            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                rect = thumbnail.getBoundingClientRect();

                            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                        }

                    };

                    // PhotoSwipe opened from URL
                    if (fromURL) {
                        if (options.galleryPIDs) {
                            // parse real index when custom PIDs are used
                            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                            for (var j = 0; j < items.length; j++) {
                                if (items[j].pid == index) {
                                    options.index = j;
                                    break;
                                }
                            }
                        } else {
                            // in URL indexes start from 1
                            options.index = parseInt(index, 10) - 1;
                        }
                    } else {
                        options.index = parseInt(index, 10);
                    }

                    // exit if index not found
                    if (isNaN(options.index)) {
                        return;
                    }

                    if (disableAnimation) {
                        options.showAnimationDuration = 0;
                    }

                    // Pass data to PhotoSwipe and initialize it
                    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                };

                // loop through all gallery elements and bind events
                var galleryElements = document.querySelectorAll(gallerySelector);

                for (var i = 0, l = galleryElements.length; i < l; i++) {
                    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                    galleryElements[i].onclick = onThumbnailsClick;
                }

                // Parse URL and open gallery if it contains #&pid=3&gid=1
                var hashData = photoswipeParseHash();
                if (hashData.pid && hashData.gid) {
                    openPhotoSwipe(hashData.pid, galleryElements[ hashData.gid - 1 ], true, true);
                }
            };
            $scope.downTime =function (time,id) {
	            var countTime = function () {
		            $(id).DownTime(time);
	            };
	            setInterval(countTime,1000);

	            var countTime = function () {
		            $('.plugin-downtime').DownTime('2018/08/21 23:59:59');
	            };
	            setInterval(countTime,1000);

            };
            $scope.TimeCountDown = function (time,id,speed,arr) {
	            $(id).TimeCountDown(time,speed,arr);
            };
            $scope.copyLinks = function (a){
                a = $.extend({}, a || {});
                $(this).copyLinks(a);
            };
            $scope.sliderLeftRight =function (obj,a) {
	            a = $.extend({}, a || {});
	            $(obj).sliderLeftRight(a);
            };
            $scope.sliderFullPageRL =function (obj,a) {
                a = $.extend({}, a || {});

                $(obj).Touch({
                    element:a.wrapper,
                    wipeLeft:function () {
                        $(this).goToPage(a.wrapper,a.item,1);
                    },
                    wipeRight:function () {
                        $(this).goToPage(a.wrapper,a.item,0);
                    }
                });
            };
            $scope.sliderFullPageUD =function (obj,a) {
                a = $.extend({}, a || {});

                $(obj).Touch({
                    element:a.wrapper,
                    mouseEvents:false,
                    wipeUp:function () {
                        $(this).goToPage(a.wrapper,a.item,1);
                    },
                    wipeDown:function () {
                        $(this).goToPage(a.wrapper,a.item,0);
                    }
                });
            };
        }])
        .controller('componentController', ['$scope' ,function($scope) {
            $scope.docsTit = "组件";
            $scope.docsMsg = "基本组件、web组件";
            $scope.checkboxAll = function (obj,parent) {
                !$(obj).prop('checked') && $(parent).find('input[type="checkbox"]').prop('checked', true);
                !!$(obj).prop('checked') && $(parent).find('input[type="checkbox"]').prop('checked', false);
            };
            $scope.formatPhone = function (id) {
                $(id).formatPhone();
            };
            $scope.formatCertificate = function (id) {
                $(id).formatCertificate();
            };
            $scope.mobilePhoneVerify = function (id) {
                $(id).mobilePhoneVerify();
            };
            $scope.vCodeVerify = function (id) {
                $(id).vCodeVerify();
            };
            $scope.passwordVerify = function (id) {
                $(id).passwordVerify();
            };
            //mobilePhone
            $scope.mobilePhoneKeyup = function (id) {
                $(id).mobilePhoneKeyup();
            };
            $scope.mobilePhoneFocus = function (id) {
                $(id).mobilePhoneFocus();
            };
            $scope.mobilePhoneBlur = function (id) {
              $(id).mobilePhoneBlur();
            };
            //checkCode
            $scope.checkCodeKeyup = function (id) {
                $(id).checkCodeKeyup();
            };
            $scope.checkCodeFocus = function (id) {
                $(id).checkCodeFocus();
            };
            $scope.checkCodeBlur = function (id) {
                $(id).checkCodeBlur();
            };
            //password
            $scope.passwordKeyup = function (id) {
                if($.type(id) === 'array'){
                    var arg = id.slice(1);
                    $(id[0]).passwordKeyup.apply($(id[0]),arg);
                }
                else{
                    $(id).passwordKeyup();
                }
            };
            $scope.passwordFocus = function (id) {
                $(id).passwordFocus();
            };
            $scope.passwordBlur = function (id) {
                $(id).passwordBlur();
            };
            $scope.showPasswordRaw = function(id){
                $(id).toggleClass('eye eye-show');
                $('[id|="passwordRaw"],[id|="passwordRaw2"]').toggle();
            };
            $scope.submitInit = function (id) {
                $(id).submitInit();
            };
            //验证码倒计时
	        $scope.sendCodeNumber = function (id) {
		        $(id).sendCodeNumber();
	        };
	        $scope.setImagePreview = function (id) {
              $(id).setImagePreview();
	        };
	        $scope.tabSwitch = function (op) {
		        op = $.extend({}, op || {});
		        tabSwitch(op);
	        }
        }])
        .controller('skillsController', ['$scope','$stateParams','$http' ,function($scope,$stateParams,$http) {
            $scope.docsTit = "进阶";
            $scope.docsMsg = "前端技能进阶";
            $scope.menulist = [
                {
                    "firstName": "技能进阶",
                    "likes": [
                        {
                            'title':"javascript","url":"js"
                        },
                        {
                            'title':"模块化开发","url":"module"
                        },
                        {
                            'title':"正则表达式","url":"regex"
                        },
	                    {
		                    'title':"ES6","url":"es6"
	                    },
	                    {
		                    'title':"font face","url":"font-face"
	                    },
                        {
                            'title':"seo","url":"seo"
                        },
//					        	{
//					        		'title':"json","url":"json"
//					        	},
//					        	{
//					        		'title':"ajax","url":"ajax"
//					        	},
                        {
                            'title':"jquery","url":"jquery"
                        },
                        {
                            'title':"css3","url":"css3"
                        },
                        {
                            'title':"html5","url":"html5"
                        },
                        {
                            'title':"mobile-web","url":"mobile-web"
                        },
                        {
                            'title':"NodeJs","url":"nodejs"
                        }
                    ]
                },
	            {
		            "firstName": "开发工具",
		            "likes": [
			            {
				            'title':"webpack",
				            'submenu':[
					            {'name':"bug",'url':"webpack-bug"}
				            ]
			            }
		            ]
	            },
                {
                    "firstName": "干货积累",
                    "likes": [
                        {
                            'title':"javascript",
                            'submenu':[
                                {'name':"基本概念",'url':"note-js01"}
                            ]
                        },
                        {
                            'title':"css",
                            'submenu':[
                                {'name':"基本概念",'url':"note-css01"}
                            ]
                        }
                    ]
                }
            ];

	        $scope.pagename = $stateParams.pageid;
	        $scope.answertitle = '查看正确答案';
	        $scope.answertitle2 = '关闭正确答案';
	        $http.get('app/data/note-js01.json').then(
		        function success(res) {
			        $scope.noteTitlelist = res.data.noteTitlelist;
		        },function error(err) {
                    console.log(err);
		        }
	        );

	        $scope.submitForm = function(answer,item) {
		        if (item !== answer) {
			        alert('回答错误');
		        }
	        };
	        $scope.isArray = function(o){
		        return Object.prototype.toString.call(o) === '[object Array]';
	        };
	        $scope.isObj = function(o){
		        return Object.prototype.toString.call(o) === '[object Object]';
	        };

            $scope.dataToggle = function () {
                $(this).dataToggle({
                    show:true
                });
            };
            $scope.testClick = function (o) {
                $(o).testClick();
            };
        }]);