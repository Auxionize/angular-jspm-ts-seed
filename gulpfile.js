const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('systemjs', 'systemjs:html', 'styles', 'other'), 'build'));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('clean', gulp.parallel('scripts', 'styles'), 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);
gulp.task('watch:dev', watchDev);
gulp.task('serve:dev', gulp.series('serve:dev:prepare', gulp.parallel('styles', 'typescript:transpile'), 'watch:dev', 'browsersync'));

function reloadBrowserSync(cb) {
    browserSync.reload();
    cb();
}

function watchDev(done) {
    gulp.watch(conf.path.src('**/*.html'), reloadBrowserSync);
    gulp.watch([
        conf.path.src('**/*.scss'),
        conf.path.src('**/*.css')
    ], gulp.series('styles'));
    gulp.watch(conf.path.src('**/*.ts'), gulp.series('typescript:transpile'));
    gulp.watch(conf.path.src('index.html'), gulp.series('serve:dev:prepare'));
    done();
}

function watch(done) {
    gulp.watch(conf.path.src('**/*.html'), reloadBrowserSync);
    gulp.watch([
        conf.path.src('**/*.scss'),
        conf.path.src('**/*.css')
    ], gulp.series('styles'));
    gulp.watch(conf.path.src('**/*.ts'), gulp.series('scripts'));
    done();
}
