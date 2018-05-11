/**
 * Created by vita on 2018/4/8.
 */

    angular.module('evApp.controller', [])
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
                        scrollNews(_obj);
                    },timeInterval);
                }).trigger("mouseout");
                function scrollNews(obj){
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
            }
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
        }])
        .controller('skillController', ['$scope' ,function($scope) {

        }]);