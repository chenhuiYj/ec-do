'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
// 获取 uglify 模块（用于压缩 JS）
let uglify = require('gulp-uglify');
/**
 * 编译js文件
 */
gulp.task('es6-js', function () {
    //pages下面的业务代码进行babel处理
    gulp.src(['./src/ec-do-2.0.0.js','./src/ec-do-3.0.0-beta.1.js','./test-es6.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});
/**
 * 压缩js
 */
gulp.task('minify-js',()=>{
    return gulp.src(['./dist/ec-do-3.0.0-beta.1.js','./dist/ec-do-2.0.0.js','./src/ec-do-1.1.4.js'])
        .pipe(uglify({
            compress:false,
            mangle:{
                reserved:['$super', '$', 'exports', 'require', 'define', 'module']
            }
        }))
        .pipe(gulp.dest('./src/min'));
});
/**
 * 运行任务
 */
gulp.task('default', ['es6-js'], function () {
    gulp.watch('*.js', ['es6-js']);
});;