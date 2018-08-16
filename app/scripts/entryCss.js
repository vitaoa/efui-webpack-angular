/**
 * Created by vita on 2018/6/22.
 */

console.log('require');


require.config({
	baseUrl: 'app/scripts',
	paths: {
		"appRoutes": ["ev-app.routes"],
		"appController": ["ev-app.controller"],
		"prettify":["jquery.prettify"],
		"collapse":["jquery.collapse"],
		"slider":["jquery.slider"],
		"photoswipeUi":["photoswipe-ui-default"],
		"jQueryRotate":["lib/jQueryRotate"],
		"picslider":["plugins/picslider"]
	},
	map: {
		'*': {
			'css': '../bower_components/require-css/css'
		}
	},
	shim: {
		'appRoutes':{
			deps: [
				'css!../../dist/app.css'
			]
		},

	}
});
require(['appRoutes','appController','prettify','collapse','slider','efui',
	'jQueryRotate','rotary','carousel','countTo','dataToggle',
	'skill','component','plugins','canvas','photoswipe','photoswipeUi','picslider','extend','jsEvent'
]);
