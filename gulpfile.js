var gulp = require('gulp');
var minifyjs = require('gulp-js-minify');
var rename = require("gulp-rename");
gulp.task('minify-js', function () {
  gulp.src('./dist/js/kc.fab.js')
    .pipe(minifyjs())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
});