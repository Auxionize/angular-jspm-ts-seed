'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);
gulp.task('typescript:transpile', typescriptTranspile);

function scripts() {
    return gulp.src(conf.path.src('**/*.ts'))
        // .pipe(tslint())
        // .pipe(tslint.report('verbose'))
        .pipe(browserSync.stream());
}

const tsProjectUntyped = ts.createProject('tsconfig.json', {isolatedModules: true});
const tsProjectTyped = ts.createProject('tsconfig.json');

let buildNo = 0;

function typescriptTranspile() {
    const result = gulp.src(conf.path.src('**/*.ts'))
        .pipe(cached())
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(buildNo === 0 ? tsProjectTyped() : tsProjectUntyped())
        .pipe(sourcemaps.write('../maps/src', {
            destPath: '.'
        }))
        .pipe(gulp.dest(conf.path.tmp(conf.paths.src)))
        .pipe(browserSync.stream());

    buildNo = (buildNo + 1) % conf.TYPED_COMPILE_INTERVAL;

    return result;
}
