'use strict';

// Load plugins
var $           = require('gulp-load-plugins')();
var del         = require('del');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

var src = './app';
var dist = './dist';
var files = {
  img: src + '/images',
  views: src + '/views',
  js: src + '/javascripts',
  scss: src + '/stylesheets',
};

// Clean
gulp.task('clean', function (cb) {
  del([dist + '/*'], cb);
});

// Styles
gulp.task('styles:dev', function() {
  return gulp.src(files.scss + '/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dist + '/stylesheets'))
    .pipe($.filter('**/*.css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe($.size());
});

gulp.task('styles:build', function() {
  return gulp.src(files.scss + '/**/*.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest(dist + '/stylesheets'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts:dev', function() {
  return browserify({
      entries: files.js + '/main.js',
      debug: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(dist + '/javascripts'));
});

gulp.task('scripts:build', function() {
  return browserify({
      entries: files.js + '/main.js',
      debug: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(cachebust.resources())
    .pipe(gulp.dest(dist + '/javascripts'));
});

// Templates
gulp.task('jade:dev', function() {
  return gulp.src(files.views + '/index.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('jade:build', ['styles:build', 'scripts:build'], function() {
  return gulp.src(files.views + '/index.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(cachebust.references())
    .pipe(gulp.dest(dist));
});

// Images
gulp.task('images', function() {
  return gulp.src(files.img + '/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dist + '/images'))
    .pipe($.size());
});

// Bower helper
gulp.task('bower', function() {
  return $.bower()
    .pipe(gulp.dest(dist + '/bower_components'));
});

// Webserver
gulp.task('serve', function() {
  return browserSync({
    server: {
      baseDir: dist
    }
  });
});

// Dev
gulp.task('dev', ['bower', 'styles:dev', 'scripts:dev', 'images', 'jade:dev'], function() {
  // Watch .scss files
  gulp.watch(files.scss + '/**/*.scss', ['styles:dev']);
  // Watch .jade files
  gulp.watch(files.views + '/**/*.jade', ['jade:dev', browserSync.reload]);
  // Watch .js files
  gulp.watch(files.js + '/**/*.js', ['scripts:dev', browserSync.reload]);
  // Watch image files
  gulp.watch(files.img + '/**/*', ['images', browserSync.reload]);
});

// Build
gulp.task('build', ['bower', 'images', 'jade:build']);

// Watch task
gulp.task('watch', function (cb) {
  runSequence('clean', 'dev', 'serve', cb);
});

// Default task
gulp.task('default', function (cb) {
  runSequence('clean', 'build', cb);
});
