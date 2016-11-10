var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    jade=require('gulp-jade');

gulp.task('watch',function(){
    //return 
})

gulp.task('templates',function(){
    gulp.src('./views/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/build'));
});

gulp.task('styles', function() {
    return sass('public/**/*.scss', {
            style: 'expanded'
        })
        .pipe(autoprefixer({
            browsers: ['Firefox>=4', 'Opera>=10', 'Android>=4.0'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //去掉不必要的前缀
        }))
        .pipe(gulp.dest('public/build'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('public/build'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});
//scripts task
gulp.task('scripts',function(){
    return gulp.src('js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('index.js'))
        .pipe(gulp)
});