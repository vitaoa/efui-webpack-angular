(function () {
    'use strict';

    /**
     * 原生javascript函数库
     * Created by GA on 2018/11/6.
     */

    /*
    * @name:getElementsByClassName
    * @param:cName,domTag,root
    * 该函数有三个参数：第一个参数是class名（必选，字串形式）；第二个参数是该DOM节点的标签名(字串形式)；第三个参数是父容器（可选），默认为body节点，通过设置id获取。
    * Eg:var adom = getElementsByClassName('title','h3'); ==>jQuery:var adom = $('h3.title');
    * */
    function getElementsByClassName (cName,domTag,root) {
        if (root) {
            root = typeof root == "string" ? document.getElementById(root) : root;
        } else{
            root = document;
        }    domTag = domTag || "*";
        var els = root.getElementsByTagName(domTag);
        var arr = [];
        for (var i = 0,n = els.length; i < n; i++) {
            for (var j = 0,k = els[i].className.split(" "),l = k.length; j < l; j++) {
                if(cName instanceof RegExp){
                    if(cName.test(k[j])){
                        arr.push(els[i]);
                        break;
                    }
                }else{
                    if (k[j] == cName) {
                        arr.push(els[i]);
                        break;
                    }
                }
            }
        }
        return arr;
    }

    /**
     * Created by GA on 2018/11/14.
     */


    window.onload = function(){
        document.getElementById('pageLoader').style.display='none';

        var alink = getElementsByClassName('page-loader','div');
        console.log(alink);
    };

}());
