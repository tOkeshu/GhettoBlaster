var gulp = require('gulp');
var babel = require("gulp-babel");
var react = require('gulp-react');
var gutil = require('gulp-util');

gulp.task("transpile", function () {
  function handleError(err) {
    console.error(err.stack);
    this.emit('end');
  }

  return gulp.src([
    "client/**/*.js",
    "client/**/*.jsx",
    "!client/vendor/*"
  ]).pipe(babel()).on('error', handleError)
    .pipe(gulp.dest("build/"));
});

gulp.task('copy-assets', function() {
  return gulp.src([
    'client/@(vendor)/*',
    'client/**/*.html',
    'client/**/*.css',
    'client/**/*.woff'
  ]).pipe(gulp.dest('build/'));
});

gulp.task('compile', ['transpile', 'copy-assets']);
gulp.task('watch', ['compile'], function() {
  gulp.watch(['client/**/*'], ['compile']);
});

