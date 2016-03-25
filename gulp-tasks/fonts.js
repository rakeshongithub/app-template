'use strict';

var Log = require('log'),
    logger = new Log('info'),
    paths = require('./paths');

module.exports = function (gulp) {

    // MOVE FONTS
    gulp.task('fonts', ['clean'], function () {
        gulp.src(paths.app.src.fonts, {base: './'})
            .pipe(gulp.dest(paths.app.build.src));
        logger.info('----> FONTS MOVED SUCCESSFULLY TO BUILD <----');
    });

};