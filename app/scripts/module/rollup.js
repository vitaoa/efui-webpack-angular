/**
 * Created by GA on 2018/11/14.
 */
/* TREE-SHAKING */
// import { cube } from './maths.js';
// import { square } from './maths.js';
import { getElementsByClassName } from './base.js';
import { ForEach } from './base.js';
import { toggleClass } from './base.js';

// console.log( cube( 5 ) ); // 125
// console.log( square( 5 ) ); // 25

window.onload = function(){
    document.getElementById('pageLoader').style.display='none';
    // classReg:'\b(i-panel-)([\w]+?)\b'
    var _regExp = /\b(i-panel-)([\w]+?)\b/g;

    var alink = getElementsByClassName('page-loader','div');
    console.log(alink)
};