const { series, watch } = require('gulp');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('./src/sass/index.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

function startBrowser(){
  return browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

watch(['./src/sass/**/*.scss', ], function() {
  return styles();
});

exports.styles = styles;
exports.startBrowser = startBrowser;
exports.default = series(styles, startBrowser);