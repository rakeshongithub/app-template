'use strict';

var gulp = require('gulp'),
    Log = require('log'),
    logger = new Log('info'),
    sass = require('gulp-ruby-sass'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer');

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
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "> 1%", "ie 8", "ie 7"],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function () {
    return gulp.src([
        'app/js/*.js'
    ]).pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compressjs', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('app/js'));
});

gulp.task('start', ['startServer']);