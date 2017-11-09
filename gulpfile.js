'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var allFiles = './src/**/*.js';
var gameFile = './src/game.js';
var phaserFile = './src/phaser.js';

gulp.task('lint', function() {
  return gulp.src(allFiles).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('phaser', function() {
  var bundle = browserify(phaserFile).bundle();
  return bundle.pipe(source('phaser.min.js')).pipe(buffer()).pipe(uglify()).pipe(gulp.dest('./public/js/lib'));
});

gulp.task('build', function() {
  return browserify(gameFile).transform(babelify).bundle().pipe(source('app.js')).pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['lint','phaser','build']);

gulp.watch(allFiles, ['lint','build']);
