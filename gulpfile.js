//gulp
var gulp = require('gulp');

// npm tools
var path  = require('path');

// gulp general plugins
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var umd = require('gulp-umd');

var sequence = require('run-sequence');
var del = require('del');

// docs & tests
var karma = require('gulp-karma');

// project directories
var dir = {
  src: './source',
  dist: './dist',
  test: './test'
};

var file = {
  full: 'stata.js',
  min: 'stata.min.js'
};


gulp.task('clean', function(done) {
  del(dir.dist, done);
});


// compile task:
// - concat files
// - UMD
// - uglify 
// - sourcemaps
var umdOptions = {
  dependencies: function() {
    return [];
  }
};

gulp.task('compile', function() {
  return gulp.src(path.join(dir.src, file.full))
    .pipe(sourcemaps.init())
    .pipe(fileinclude('//='))
    .pipe(umd(umdOptions))
    .pipe(gulp.dest(dir.dist))
    .pipe(uglify())
    .pipe(rename(file.min))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('docs', function() {
  return;
});


// test task:
gulp.task('test', function () {
  return gulp.src(path.join(dir.test, 'tests.html'))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});


// __watch__ task:
gulp.task('watch', function () {
  gulp.watch(path.join(dir.src, '**/*.js'), ['build']);

  gulp.watch([
    path.join(dir.src, '**/*.js'),
    path.join(dir.test, '**/*test.js')
  ], ['test']);
});


gulp.task('build', function(done) {
  sequence('clean', 'compile', 'docs', done);
});

gulp.task('develop', function(done) {
  sequence('build', 'test', 'watch', done);
});

gulp.task('default', ['build']);
