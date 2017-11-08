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
    gulp.src(['./ec-do-2.0.0.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});
/**
 * 运行任务
 */
gulp.task('default', ['es6-js'], function () {
    gulp.watch('./src/js/**/*.js', ['es6-js']);
});;