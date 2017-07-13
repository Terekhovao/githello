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
 		livereload:true;
 	});
 });

 gulp.task('html', function(){
 	 gulp.src('dev/**/*.html')
 	 .pipe(includer())
 	 .pipe(rename(function(path){
 	 	path.dirname = ''
 	 }))
 	 .pipe(gulp.dest('build/'))
 });


 gulp.task ('css', function (){
 	gulp.src('dev/assets/**/*.css')
 	.pipe(cssConcat('css/style.css'))
 	.pipe(csso())
 	.pipe(rename(function(path){
 	 	path.dirname = ''
 	 }))
 	.pipe(rename(function(path){
 		path.dirname = ''
 	}))
 	 .pipe(gulp.dest('build/css/mystyle.css'))
 	 .pipe(connect.reload());
 })  


 gulp.task("default", function(){
 	gulp.start(["server","html","css"]);
 })

