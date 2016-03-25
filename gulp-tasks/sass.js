'use strict';

var Log = require('log'),
    logger = new Log('info'),
    paths = require('./paths'),
    sass = require('gulp-ruby-sass'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer-core');

module.exports = function (gulp) {

    // SASS COMPILER
    gulp.task('sass', ['clean'], function () {
        logger.info('---> Complied SCSS Successfully. Output File: ' + paths.app.src.css);
        logger.info('---> CSS Output Style: EXPENDED');
        return sass(paths.app.src.scss, {style: 'expanded'})
            .on('error', sass.logError)
            .pipe(postcss(
                [
                    autoprefixer({
                        browsers: ['> 0%', 'last 2 versions'],
                        cascade: false
                    })
                ]
            ))
            .pipe(gulp.dest(paths.app.src.css))
            .pipe(browserSync.stream());
    });

};