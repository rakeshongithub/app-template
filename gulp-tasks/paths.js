'use strict';

/*---------- DECLARE PATHS ----------*/
module.exports = {
    app: {
        root: './app',
        src: {
            html: './app/**/*.html',
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
    }
};