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
  gulp.src('src/index.js')
  // .pipe(reactify({reactTools: reactTools}))
  .pipe(browserify({
    fileName: 'index.js',
    extensions: ['.js', '.jsx', '.es', '.es6'],
    transform: [require('6to5ify'), jsxify.configure({factory: 'React.createClass'})],
    options: {debug: true}
  }))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('prepare-css', function ()
{
  gulp.src([
    'src/reset.css',
    'notifications/**/*.css',
    'notification-counts/**/*.css'
  ])
  .pipe(cssi('styles.css', {prefix: '../', saveEnclosure: 1}))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('watch', ['default'], function ()
{
  livereload.listen();
  gulp.watch('src/**/*.{js,jsx}', ['prepare-js']);
  gulp.watch('notifications/**/*.css', ['prepare-css']);
});
