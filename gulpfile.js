'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
//var concat = require('gulp-concat');
//var runSequence = require('run-sequence');

// HTML
gulp.task('html', function() {
  return gulp.src(['*.html'])
  .pipe(connect.reload());
});

// SASS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'));
 });

// Live Reload
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

// Watch Directory w/ Live Reload Dependancy
gulp.task('watch', ['connect'], function() {
  gulp.watch('*.html', ['html']);
  gulp.watch('sass/**/*.scss',['sass']);
});

// Build - Runs Scripts, CSS & HTML tasks & Moves files to Dest
//gulp.task('build', ['sass', 'html'], function() {
//  return gulp.src([
//    'css/**',
//    'img/**',
//    '*.html',
//    '*.png',
//    '*.ico'], { base: './'})
//  .pipe(gulp.dest('dist'));
//});

// Default Task
gulp.task('default', function (callback) {
  //runSequence('build', callback)
});
