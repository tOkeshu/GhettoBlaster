var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('prepare-build', function() {
  return gulp.src([
    'client/**/*.html',
    'client/**/*.js',
    'client/**/*.css',
    'client/**/*.woff'
  ]).pipe(gulp.dest('build/'));
});

gulp.task('compile', ['prepare-build'], function() {
  return gulp.src(['client/**/*.jsx'])
    .pipe(react())
    .pipe(gulp.dest('build/'))
});

gulp.task('watch', ['compile'], function() {
  gulp.watch(['client/**/*'], ['compile']);
});

