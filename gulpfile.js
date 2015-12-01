'use strict';

var gulp = require('gulp'),
    Log = require('log'),
    logger = new Log('info'),
    notify = require("gulp-notify"),
    sass = require('gulp-ruby-sass'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
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

    gulp.watch('sass/**/*.scss', ['sass']).on('change', function (event) {
        browserSync.reload();
        logger.info('-- File "' + event.path + '" was ' + event.type + ', running tasks...');
    });
    gulp.watch("app/*.html").on('change', function (event) {
        browserSync.reload();
        logger.info('-- File "' + event.path + '" was ' + event.type + ', running tasks...');
    });

});

gulp.task('sass', function () {
    return sass('sass/**/*.scss', {style: 'expanded'})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "> 1%", "ie 8", "ie 7"],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
        .pipe(notify('-- Complied SCSS Successfully. Output File: "<%= file.relative %>"'))
        .pipe(notify('-- CSS Output Style: EXPENDED'));
});

gulp.task('lint', function () {
    return gulp.src([
        'app/js/*.js'
    ]).pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify('-- JSHINT Run Successfully. File Checked: "<%= file.relative %>"'));
});

gulp.task('compressjs', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(notify({message: '-- SUCCESSFULLY Compressed JS files. Output file - "<%= file.relative %>"'}));
});

gulp.task('minifycss', function () {
    gulp.src('app/css/*.css')
        .pipe(minifyCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(notify('-- SUCCESSFULLY Minified CSS Files. Output file - "<%= file.relative %>".'));
});

gulp.task('compress', ['compressjs', 'minifycss']);
gulp.task('start', ['startServer']);