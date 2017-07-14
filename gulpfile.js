 var gulp = require ('gulp');
 var includer = require ('gulp-htmlincluder');
 var connect = require ('gulp-connect');
 var csso = require ('gulp-csso');
 var cssConcat = require ('gulp-concat-css');
 var rename = require ('gulp-rename');
 var htmlmin = require('gulp-htmlmin');
 
 gulp.task('server', function(){
 	connect.server({
 		root:'build/',
 		livereload:true
 	});
 });

 gulp.task('html', function(){
 	 gulp.src('dev/**/*.html')
 	 .pipe(includer())
 	 .pipe(htmlmin({
 	 	collapseWhitespace:true,
 	 	removeComments:1,
 	 }))
 	 .pipe(rename(function(path){
 	 	path.dirname = ''
 	 }))
 	 .pipe(gulp.dest('build/'))
 	 .pipe(connect.reload());
 });


 gulp.task ('css', function (){
 	gulp.src('dev/assets/**/*.css')
 	.pipe(cssConcat('mystyle.css'))
 	// .pipe(csso())
 	.pipe(rename(function(path){
 	 	path.dirname = ''
 	 }))
 	 .pipe(gulp.dest('build/css/'))
 	 .pipe(connect.reload());
 })  

 
 gulp.task("default", function(){
 	gulp.start(["server","html","css"]);

 	gulp.watch(['dev/**/*.html'], function(){
        gulp.start(['html']);
    });

    gulp.watch(['dev/**/*.css'], function(){
        gulp.start(['css']);
    });
 })

