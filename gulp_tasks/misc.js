const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const rename = require('gulp-rename');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('uninstall', uninstall);
gulp.task('reset', gulp.parallel('clean', 'uninstall'));

function clean() {
    return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
    const fileFilter = filter(file => file.stat.isFile());
    const jsonFilter = path => {
        if (path.extname === '.json') {
            path.dirname = `src/${path.dirname}`;
        }
    };

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join(`!${conf.paths.src}`, '/**/*.{scss,ts,html}')
    ])
        .pipe(fileFilter)
        .pipe(rename(jsonFilter))
        .pipe(gulp.dest(conf.paths.dist));
}

function uninstall() {
    return del(['node_modules', 'jspm_packages']);
}
