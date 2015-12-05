'use strict';

/*---------- DECLARE GULP VARIABLES ----------*/
var gulp = require('gulp'),
    Log = require('log'),
    logger = new Log('info'),
    notify = require("gulp-notify"),
    sass = require('gulp-ruby-sass'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    rev = require('gulp-rev'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean');


/*---------- DECLARE PATHS ----------*/
var paths = {
    root: './app',
    src: {
        html: './app/*.html',
        scss: 'sass/**/*.scss',
        css: './app/css',
        js: 'app/js/*.js',
        fonts: 'app/fonts/**/*.*',
        images: 'app/images/**/*.*'
    },
    build: {
        src: './.tmp/build',
        images: './.tmp/build/app/images'
    }
};


/*---------- TASKS ----------*/

// RUN PRODUCTION APPLICATION
gulp.task('start-build-server', function (cb) {
    logger.info('----> PRODUCTION APPLICATION NOW RUNING FROM BUILD FOLDER <----');
    browserSync.init({
        port: 3011,
        server: {
            baseDir: paths.build.src + '/app',
            index: 'index.html'
        }
    }, cb)
});

// MOVE FONTS
gulp.task('fonts', function () {
    gulp.src(paths.src.fonts, {base: './'})
        .pipe(gulp.dest(paths.build.src))
        .pipe(notify('---> FONTS MOVED SUCCESSFULLY TO BUILD'));
});

// Minify Images
gulp.task('imagemin', function () {
    return gulp.src(paths.src.images)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.images));
});

// START SERVER FOR DEVELOPMENT
gulp.task('server', function (cb) {

    logger.info('----> SERVER STARTED AND RUNING...');

    browserSync.init({
        port: 3010,
        server: {
            baseDir: paths.root,
            index: 'index.html'
        }
    }, cb);

    gulp.watch(paths.src.scss, ['sass']).on('change', function (event) {
        browserSync.reload();
        logger.info('---> File "' + event.path + '" was ' + event.type + ', running tasks...');
    });
    gulp.watch(paths.src.html).on('change', function (event) {
        browserSync.reload();
        logger.info('---> File "' + event.path + '" was ' + event.type + ', running tasks...');
    });

});

// SASS COMPILER
gulp.task('sass', function () {
    return sass(paths.src.scss, {style: 'expanded'})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "> 1%", "ie 8", "ie 7"],
            cascade: false
        }))
        .pipe(gulp.dest(paths.src.css))
        .pipe(browserSync.stream())
        .pipe(notify('---> Complied SCSS Successfully. Output File: "' + paths.src.css + '/<%= file.relative %>"'))
        .pipe(notify('---> CSS Output Style: EXPENDED'));
});

// JS LINT
gulp.task('lint', function () {
    return gulp.src(paths.src.js).pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify('---> JSHINT Run Successfully. File Checked: "' + paths.root + '/js/<%= file.relative %>"'));
});

// CLEAN BUILD FOLDER
gulp.task('clean', function (cb) {
    logger.info('---> CLEANED BUILD FOLDER ".TEMP" SUCCESSFULLY PRODUCTION CODE -:) <---');
    return gulp.src('./.tmp/', {read: false})
        .pipe(clean(cb));
});

// USEMIN: CONCAT & MINIFY JS, CSS AND ADD REVISION TO AVOID CACHE
gulp.task('mergeAndMinify', function () {
    logger.info('---> UPDATE *.HTML APP ROOT' || 'BLANK');
    return gulp.src(paths.src.html)
        .pipe(usemin({
            path: paths.root,
            html: [function () {
                return minifyHtml({empty: true});
            }],
            cssApp: [minifyCss, 'concat', rev],
            cssVendor: [minifyCss, 'concat', rev],
            jsVendor: [uglify, 'concat', rev],
            jsApp: [uglify, rev]
        }))
        .pipe(gulp.dest(paths.build.src + '/app'))
        .pipe(notify({message: '---> SUCCESSFULLY CREATED BUILD - "' + paths.build.src + '/app/<%= file.relative %>"'}));
});

/*---------- Environements Tasks ----------*/

// Development tasks
gulp.task('start-dev', ['server']);

// Production tasks
gulp.task('build-prod', ['mergeAndMinify', 'fonts', 'imagemin']);

// Start Production app
gulp.task('start-prod', ['start-build-server']);
