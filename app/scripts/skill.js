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