'use strict';

var clean = require('gulp-clean'),
    Log = require('log'),
    logger = new Log('info');

module.exports = function(gulp) {

    gulp.task('clean', function (cb) {
        logger.info('---> CLEANED BUILD FOLDER ".TEMP" SUCCESSFULLY -:) <---');
        return gulp.src('./.tmp/', {read: false})
            .pipe(clean(cb));
    });

};