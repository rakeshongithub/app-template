var gulp = require('gulp');
var Log = require('log');
var logger = new Log('info');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('startServer', function () {

    logger.info('Welcome to Maarkup.com');

    browserSync.init({
        server: "./",
        port: 3010
    });

    gulp.watch('sass/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task('sass', function () {
    return sass('sass/**/*.scss', {style: 'compressed'})
        .on('error', sass.logError)
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('start', ['startServer']);