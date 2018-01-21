var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var port = process.env.PORT || 3000;

var jsFiles = ['*.js','src/**/*.js'];

gulp.task('style', function (params) {
    console.log('Running the style task.');
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js']);
    var injectOptions = {
        ignorePath: '/public'
    };
    return gulp.src('./src/views/*.pug')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc,injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve',['style','inject'],function () {
    return nodemon({delayTime:1,script:'server.js',watch: jsFiles, env: {'PORT': port}}).on('restart',function (ev) {
        console.log('restarting....');
    });
});