const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const conf = require('../conf/gulp.conf');

gulp.task('styles', styles);

function styles() {
    return gulp.src(conf.path.src('assets/styles.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'})).on('error', conf.errorHandler('Sass'))
        .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(conf.path.tmp(path.join(conf.paths.src, 'assets'))))
        .pipe(browserSync.stream());
}
