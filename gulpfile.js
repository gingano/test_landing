'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let ghPages = require('gulp-gh-pages');

function style () {
  return gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({cascade: false }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
}

function watch () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./sass/**/*.sass', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

function build () {
  return gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({cascade: false }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
}

function deploy () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
}

exports.style = style;
exports.watch = watch;
exports.build = build;
exports.deploy = deploy;

