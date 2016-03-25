'use strict';

/*---------- DECLARE GULP VARIABLES ----------*/
var gulp = require('gulp'),
    Log = require('log'),
    logger = new Log('info'),
    paths = require('./gulp-tasks/paths'),
    sass = require('gulp-ruby-sass');

['server', 'clean', 'fonts', 'sass', 'lint', 'minify'].forEach(function (tasks) {
    require('./gulp-tasks/' + tasks)(gulp);
});

// Development tasks
gulp.task('start-dev', ['server'], function(){
    logger.info('----> LOCAL SERVER STARTED AND RUNING AT http://localhost:7071');
});

// Production tasks
gulp.task('build', ['clean', 'mergeAndMinify', 'fonts', 'imagemin'], function () {
    logger.info('---> SUCCESSFULLY CREATED BUILD AT:' + paths.build.src);
});

// Start Production app
gulp.task('start-prod', ['server-prod'], function () {
    logger.info('----> PRODUCTION APPLICATION RUNING FROM BUILD FOLDER <----');
});
