'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

/**
 * use in browser
 */
var browserSync = require('browser-sync'),
    reload      = browserSync.reload;



gulp.task('watch', function () {
    gulp
      .watch('app/**/*.*')
      .on('change', reload);
});

/**
 * use in browser
 */
gulp.task('browser-sync', function() {

    browserSync.init({
        // 服务开启地址
        proxy: "http://localhost:8036"
    });

});


gulp.task('start-server', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('serve',['start-server', 'browser-sync', 'watch'], function () {

});
