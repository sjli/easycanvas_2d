'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    webpack = require('webpack-stream');

/* webpack */
gulp.task('webpack', function() {
  return gulp.src('src/js/*/*.js')
    .pipe(plumber())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['webpack'], function() {

  gulp.watch(['src/**/*.*'], ['webpack']);
  
});


gulp.task('default', function() {
  gulp.start('watch');
});