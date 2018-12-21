const rollup = require('rollup');
const watcher = rollup.watch({
    include:"app/scripts/module/**/*.js",
    exclude:"*.js"
});

watcher.on('event', event => {
    console.log(event.code)
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
});

export default {
    input: 'app/scripts/module/rollup.js',
    output: {
        file: 'app/scripts/module/dist/rollup.js',
        format: 'iife',
        strict: true
    },
    watch: {
    },
    plugins: []
};

// rollup src/main.js -o index.js -f iife
// -f 指定输出文件类型：cjs(nodejs使用), iife(浏览器使用), umd(浏览器与nodejs同时使用)
// -o 输出文件名
// --watch rollup-watch插件，监听源文件是否有改动，如果有改动，重新打包