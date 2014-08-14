var gulp        = require('gulp');
var harp        = require('harp')
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var deploy      = require('gulp-gh-pages');
var cp          = require('child_process');

/**
 * Serve the Harp Site
 */
gulp.task('serve', function (done) {
  harp.server('.', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000"
    });
    gulp.watch("public/**/*", ['browser-reload']);
  });
});

/**
 * Build the Harp Site
 */
gulp.task('build', function (done) {
  cp.exec('harp compile . dist', {stdio: 'inherit'})
    .on('close', done)
});

/**
 * Browser-sync task, only cares about compiled CSS
 */
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost:9000"
  });
});

gulp.task('browser-reload', function() {
  // harp.process();
  // reload({stream: true});
  reload();
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['build'], function () {
  gulp.src("./dist/**/*")
    .pipe(deploy());
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the harp site, launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
