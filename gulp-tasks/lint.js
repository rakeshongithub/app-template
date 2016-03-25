'use strict';

var jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint');

module.exports = function (gulp) {

    // JS LINT
    gulp.task('lint', function () {
        return gulp.src([
            'app/**/*.js',
            '!app/js/vendor/*.js'
        ]).pipe(jscs())
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

};