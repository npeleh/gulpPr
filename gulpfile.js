var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    image = require('gulp-image');
gulp.task('browser-sync', ['styles', 'jade'], function(){
    browserSync.init({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});
gulp.task('image', function(){
    gulp.src('./app/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('build/img'))
})

//компілює scss код
gulp.task('styles', function(){
    return gulp.src('./app/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
        suffix: '.min',
        preffix: ''
    }))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: true
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});
//compile jade code
gulp.task('jade', function(){
    return gulp.src('./app/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
});

gulp.task('build', ['styles', 'jade']);

gulp.task('watch', function(){
    gulp.watch('app/style/**/*.scss', ['styles']);
    gulp.watch('app/templates/**/*.jade', ['jade']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);






