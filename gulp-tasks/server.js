'use strict';

var Log = require('log'),
    logger = new Log('info'),
    paths = require('./paths'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon');

module.exports = function (gulp) {

    // STARTING NODEMON SERVER
    gulp.task('nodemon', function (cb) {
        var started = false;
        return nodemon({
            script: 'app.js'
        }).on('start', function () {
            // to avoid nodemon being started multiple times
            // thanks @matthisk
            if (!started) {
                cb();
                started = true;
            }
        });
    });

    // RUN APPLICATION WITH PRODUCTION READY
    gulp.task('server-prod', ['nodemon'], function () {
        browserSync.init({
            port: 7072,
            server: {
                baseDir: paths.app.build.src + '/app',
                index: 'index.html'
            }
        })
    });

    // START SERVER FOR DEVELOPMENT
    gulp.task('server', ['nodemon'], function () {
        browserSync.init({
            files: [
                paths.app.src.scss,
                paths.app.src.css,
                paths.app.src.html
            ],
            injectChanges: true,
            proxy: "http://localhost:3030",
            port: 7071
        });

        gulp.watch(paths.app.src.scss, ['sass']).on('change', function (event) {
            browserSync.reload({stream: true});
            logger.info('---> File "' + event.path + '" was ' + event.type + ', running tasks...');
        });
        gulp.watch(paths.app.src.html).on('change', function (event) {
            browserSync.reload();
            logger.info('---> File "' + event.path + '" was ' + event.type + ', running tasks...');
        });
    });

};