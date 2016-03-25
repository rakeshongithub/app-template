'use strict';

var Log = require('log'),
    logger = new Log('info'),
    paths = require('./paths'),
    imagemin = require('gulp-imagemin'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev');

module.exports = function (gulp) {

    // Minify Images
    gulp.task('imagemin', ['clean'], function () {
        return gulp.src(paths.app.src.images)
            .pipe(imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(paths.app.build.images));
    });

    // USEMIN: CONCAT & MINIFY JS, CSS AND ADD REVISION TO AVOID CACHE
    gulp.task('mergeAndMinify', ['clean'], function (cb) {
        logger.info('---> UPDATE *.HTML APP ROOT' || 'BLANK');
        return gulp.src(paths.app.src.html)
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
            .pipe(gulp.dest(paths.app.build.src + '/app'));
    });

};