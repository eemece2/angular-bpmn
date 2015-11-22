var gulp       = require('gulp');
var svgSymbols = require('gulp-svg-symbols');
//var svgmin     = require('gulp-svgmin');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngHtml2Js  = require('gulp-ng-html2js');
var rename     = require('gulp-rename');
var livereload = require('gulp-livereload');
var sass       = require('gulp-sass');
var merge      = require('merge-stream');
var ngAnnotate = require('gulp-ng-annotate');
var rename     = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

gulp.task('build', ['scripts', 'sass'], function() {
});

gulp.task('scripts', ['symbols'], function() {
    var templates = gulp.src(['./src/js/**/*.html'])
        .pipe(ngHtml2Js({
            moduleName: 'bpmn.templates',
            prefix: 'js/'
        }));

    var javascripts = gulp.src('src/js/**/*.js');

    merge(templates, javascripts)
        .pipe(sourcemaps.init())
        .pipe(concat('angular-bpmn.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));

    merge(templates, javascripts)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('angular-bpmn.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

// Prueba
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('angular-bpmn.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

// Prueba
gulp.task('js:min', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('angular-bpmn.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

// SVG symbols
gulp.task('symbols', function () {
    return gulp.src('svg/*.svg')
        //.pipe(svgmin())
        .pipe(svgSymbols({
            templates: ['default-svg']
        }))
        .pipe(rename('svg-symbols.directive.html'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
        //.pipe(livereload());
});

// watch
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/js/**/*.html', ['scripts']);
});

