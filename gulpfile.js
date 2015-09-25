var gulp = require('gulp');
var browserify = require('gulp-browserify2');
var livereload = require('gulp-livereload');
var jsxify = require('jsx-transform').browserifyTransform;
var cssi = require('gulp-cssi');
var reactify = require('gulp-reactify');
var reactTools = require('react-tools');

gulp.task('default', ['prepare-js', 'prepare-css']);

gulp.task('prepare-js', function ()
{
  gulp.src('src/index.jsx')
  .pipe(reactify({reactTools: reactTools}))
  .pipe(browserify({
    fileName: 'react-notifications.js',
    extensions: ['.js', '.jsx', '.es', '.es6'],
    transform: [require('6to5ify')],
    options: {debug: true}
  }))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('prepare-css', function ()
{
  gulp.src([
    'src/reset.css',
    'src/**/*.css'
  ])
  .pipe(cssi('styles.css', {prefix: '../src/'}))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('watch', ['default'], function ()
{
  livereload.listen();
  gulp.watch('src/**/*.jsx', ['prepare-js']);
  gulp.watch('src/**/*.css', ['prepare-css']);
});
