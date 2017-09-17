'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var replace = require('gulp-replace');
var cleancss = require('gulp-clean-css');
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
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest('./css'));
 });

 // Dependencies
 gulp.task('deps', function() {
  gulp.src(['./node_modules/normalize.css/normalize.css'])
      .pipe(replace('../', '/node_modules/normalize.css/'))
      .pipe(cleancss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./css/vendor/'));
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
  gulp.watch('sass/**/*.scss',['sass','deps']);
});

// gulpBuild - Runs Scripts, CSS & HTML tasks & Moves files to Dest
gulp.task('build', ['sass','deps','html'], function() {
  return gulp.src([
    'css/**',
    '!css/**/_*/',
    '!css/_*/**/*',
    'img/**',
    '*.html',
    '*.png',
    '*.ico'], { base: './'})
  .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', function (callback) {
  //runSequence('build', callback)
});
