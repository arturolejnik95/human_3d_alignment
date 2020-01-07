var gulp = require('gulp');
var browserify = require('browserify');
var eslint = require('gulp-eslint');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var jsdoc = require('gulp-jsdoc3');

gulp.task('eslint', function() {
    return gulp.src(['src/**/*.jsx','src/**/*.js', 'src/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('build', function () {
    return browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: true})
        .ignore('./sdk-core/frams_sdk.js', './external/physijs/*')
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.', {
            includeContent: true,
            sourceRoot: '.'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['eslint', 'build'], function () {
    gulp.watch(['src/**/*.jsx','src/**/*.js'], ['build']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("dist/*").on('change',browserSync.reload);
});

gulp.task('doc', function(cb) {
    gulp.src(['DOCUMENTATION.md', './src/**/*.jsx', './src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('default', ['eslint', 'build']);