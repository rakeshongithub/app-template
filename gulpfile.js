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
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean');

var filesToMove = [
    'app/js/**/*.*',
    'app/css/**/*.*',
    'app/fonts/**/*.*',
    'app/images/**/*.*',
    'app/*.html'
];

gulp.task('start-build', function (cb) {
    logger.info('----> APPLICATION NOW RUNING FROM BUILD FOLDER <----');
    browserSync.init({
        port: 8000,
        server: {
            baseDir: './.tmp/build/app',
            index: 'index.html'
        }
    }, cb)
});

gulp.task('server', function (cb) {

    logger.info('----> SERVER STARTED AND RUNING...');

    browserSync.init({
        port: 3010,
        server: {
            baseDir: './app',
            index: 'index.html'
        }
    }, cb);

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

gulp.task('clean', function () {
    return gulp.src('./.tmp', {read: false})
        .pipe(clean());
});


gulp.task('move', ['clean'], function(){
    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest('./.tmp/build'));
});

gulp.task('compressjs', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./.tmp/build/app/js'))
        .pipe(notify({message: '-- SUCCESSFULLY Compressed JS files. Output file - "<%= file.relative %>"'}));
});

gulp.task('minifycss', function () {
    gulp.src('app/css/*.css')
        .pipe(minifyCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./.tmp/build/app/css'))
        .pipe(notify('-- SUCCESSFULLY Minified CSS Files. Output file - "<%= file.relative %>".'));
});

gulp.task('build', ['compressjs', 'minifycss', 'move']);
gulp.task('start', ['server']);