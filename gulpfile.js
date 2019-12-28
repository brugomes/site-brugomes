const { series, watch } = require('gulp');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('./src/sass/index.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
}

function js() {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/js/all.min.js')
     .pipe(gulp.dest('./dist/assets/js'));
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
exports.default = series(styles, js, startBrowser);