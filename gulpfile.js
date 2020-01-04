const { series, parallel, watch } = require('gulp');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    merge = require('merge-stream'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    fs = require('fs');

function cleanFolder(){
  try {
      fs.statSync('dist');
      return gulp.src('dist')
        .pipe(clean({force: true}));
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      return gulp.src('.');
    }
  }
}

function copy(){
  return gulp.src(['index.html', 'src/**', '!src/sass/**', '!src/js/**'])
    .pipe(gulp.dest('dist/'))
}

function styles() {
  return gulp.src('src/sass/index.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function js() {
    var fontawesome =  gulp.src('node_modules/@fortawesome/fontawesome-free/js/all.min.js')
      .pipe(rename("fontawesome.min.js"))
      .pipe(gulp.dest('dist/js'));

    var jquery =  gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('dist/js'));

    var script =  gulp.src('src/js/*.js')
      .pipe(rename("script.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));

    return merge(fontawesome, jquery, script);
}

function startBrowser(){
  return browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
}

watch(['src/sass/**/*.scss', ], function() {
  return styles();
});

exports.default = series(cleanFolder, parallel(copy, styles, js, startBrowser));