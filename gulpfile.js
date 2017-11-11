'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-clean-css');

var allFiles = './src/js/**/*.js';
var gameFile = './src/js/game.js';
var phaserFile = './src/js/phaser.js';
var cssFile = './src/css/style.css';

gulp.task('lint', function() {
  return gulp.src(allFiles).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('cssMin', function() {
  return gulp.src(cssFile).pipe(cssmin()).pipe(gulp.dest('./public/css'));
});

gulp.task('phaser', function() {
  var bundle = browserify(phaserFile).bundle();
  return bundle.pipe(source('phaser.min.js')).pipe(buffer()).pipe(uglify()).pipe(gulp.dest('./public/js/lib'));
});

gulp.task('build', function() {
  return browserify(gameFile).transform(babelify).bundle().pipe(source('app.js')).pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['lint','cssMin','phaser','build']);

gulp.watch(allFiles, ['lint','build']);
