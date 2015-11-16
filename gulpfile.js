'use strict';

var gulp = require('gulp');
var Log = require('log');
var logger = new Log('info');
var sass = require('gulp-ruby-sass');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('startServer', function () {

    logger.info('Welcome to Maarkup.com');

    browserSync.init({
        server: "./app",
        port: 3010
    });

    gulp.watch('sass/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);

});

gulp.task('sass', function () {
    return sass('sass/**/*.scss', {style: 'compressed'})
        .on('error', sass.logError)
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    return gulp.src([
        'app/js/*.js'
    ]).pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('start', ['startServer']);