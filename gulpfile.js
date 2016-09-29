'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

gulp.task('copy', function() {

    console.log('------------------gulp copy-------------------');

    return gulp.src([
            'assets/index.html',
            'assets/css/**/*',
            'assets/images/**/*',
            'assets/aboutus/**/*',
            'assets/access/**/*',
            'assets/contact/**/*',
            'assets/links/**/*',
            'assets/members/**/*',
            'assets/music/**/*',
            'assets/news/**/*'
        ],
        { base: 'assets' })
        .pipe(gulp.dest('html/'));
});

gulp.task('sass', function() {

    console.log('------------------gulp sass-------------------');

    return gulp.src([
            'assets/scss/style.scss'
        ])
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
})

gulp.task('default', ['sass','copy'], function() {
    browserSync.init({
        server: {
            baseDir: "html"
        }
    });

    console.log('------------------gulp watch-------------------');
    gulp.watch(['html/index.html'], browserSync.reload);
    gulp.watch(['assets/scss/**/*.scss'], ['sass']);
    gulp.watch(['assets/**/*'], ['copy']);
});
