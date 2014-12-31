'use strict';

// Load plugins
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Clean
gulp.task('clean', function (cb) {
  del(['dist/*'], cb);
});

// Styles
gulp.task('styles:dev', function() {
  return gulp.src('app/stylesheets/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe($.filter('**/*.css'))
    .pipe(reload({stream: true}))
    .pipe($.size());
});

gulp.task('styles:build', function() {
  return gulp.src('app/stylesheets/style.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function() {
  return browserify({
      entries: './app/javascripts/main.js',
      debug: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/javascripts'));
});

// Templates
gulp.task('jade', function() {
  return gulp.src('app/views/index.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Bower helper
gulp.task('bower', function() {
  return $.bower()
    .pipe(gulp.dest('dist/bower_components'));
});

// Webserver
gulp.task('serve', function() {
  return browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

// Dev
gulp.task('dev', ['bower', 'jade', 'styles:dev', 'scripts', 'images', 'serve'], function() {
  // Watch .scss files
  gulp.watch('app/stylesheets/**/*.scss', ['styles:dev']);
  // Watch .jade files
  gulp.watch('app/views/**/*.jade', ['jade', browserSync.reload]);
  // Watch .js files
  gulp.watch('app/javascripts/**/*.js', ['scripts', browserSync.reload]);
  // Watch image files
  gulp.watch('app/images/**/*', ['images', browserSync.reload]);
});

// Build
gulp.task('build', ['bower', 'jade', 'styles:build', 'scripts', 'images']);

// Watch task
gulp.task('watch', function (cb) {
  runSequence('clean', 'dev', cb);
});

// Default task
gulp.task('default', function (cb) {
  runSequence('clean', 'build', cb);
});
