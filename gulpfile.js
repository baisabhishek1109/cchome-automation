'use strict';
var gulp = require('gulp');
var protractorFlake = require('protractor-flake');
var eslint = require('gulp-eslint');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var eslintFileList = ['*.js','datasources/**/*.js','test/**/*.js'];
 
gulp.task('clean', function () {
    return gulp.src('testresults/*', {read: false})
        .pipe(clean());
});

gulp.task('eslint', function () {
    return gulp.src(eslintFileList)
        .pipe(eslint({
            'configFile': 'config/eslint.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('startTest', function () {
    protractorFlake({
        maxAttempts: 3,
        protractorPath: 'node_modules/protractor/bin/protractor',
        parser: 'standard'
    }, function (status, output) {
        process.exit(status);
    });
});

gulp.task('test', function (cb) {
    runSequence('clean','eslint', 'startTest', function (error) {
        if (error)
            console.log(error);
    });
});



