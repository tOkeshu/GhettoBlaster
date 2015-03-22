var gulp = require('gulp');
var react = require('gulp-react');
var gutil = require('gulp-util');

gulp.task('prepare-build', function() {
  return gulp.src([
    'client/**/*.html',
    'client/**/*.js',
    'client/**/*.css',
    'client/**/*.woff'
  ]).pipe(gulp.dest('build/'));
});

gulp.task('compile', ['prepare-build'], function() {
  function handleError(err) {
    var message = gutil.template(
      '<%= file %> line <%= line %>: <%= desc %>',
      {
        file: err.fileName,
        line: err.lineNumber,
        desc: err.description
      }
    );
    gutil.log(gutil.colors.red(message));
    this.emit('end');
  }

  return gulp.src(['client/**/*.jsx'])
    .pipe(react()).on('error', handleError)
    .pipe(gulp.dest('build/'))
});

gulp.task('watch', ['compile'], function() {
  gulp.watch(['client/**/*'], ['compile']);
});

