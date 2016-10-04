// Gulp Dependencies
var gulp = require('gulp');

// Build Dependencies
var browserify = require('gulp-browserify')
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

// lint-test task
gulp.task('lint-test', function() {
  return gulp.src('./public/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// browserify task

gulp.task('browserify', function () {
  return gulp.src(['./public/index.js'])
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public'));
});

// start our server and listen for changes
gulp.task('start', function() {
    return nodemon({
        script: 'app.js',
        tasks: 'browserify',
        watch: ['public/index.js', 'public/style.css']
  });
});

gulp.task('build', ['lint-test'], function() {
  return gulp.src('./public/*.*')
    .pipe(gulp.dest('build'));
});
