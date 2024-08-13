// nexe.js
const { compile } = require('nexe');

compile({
    input: './bootstrap.js', // Midway 启动文件，通常是 bootstrap.js
    build: true, // 是否需要构建 Node.js
    target: 'windows-x64-14.15.1', // 目标平台和 Node.js 版本
    output: 'midway-app.exe' // 输出文件名
}).then(() => {
    console.log('Success');
}).catch((error) => {
    console.error('Error:', error);
});
