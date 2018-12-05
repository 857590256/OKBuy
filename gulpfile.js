const gulp = require("gulp");
// gulp 服务器插件;
const connect = require("gulp-connect");
// gulp 合并插件;
var concat = require('gulp-concat');
// gulp 压缩插件;
var uglify = require("gulp-uglify");
// babel 插件;
var babel = require("gulp-babel");
// css 插件;
var cleanCss = require("gulp-clean-css");
// sass 编译插件;
var sass = require("gulp-sass-china");
const proxy=require("http-proxy-middleware");
gulp.task("html",()=>{
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
gulp.task("script",()=>{
    return gulp.src(["javascripts/*.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/javascripts/"))
})
gulp.task("images",()=>{
    return gulp.src(["images/*.*"])
    .pipe(gulp.dest("dist/images/"))
})
gulp.task("styles", ()=>{
    return gulp.src(["stylesheets/*.css"])
    .pipe(gulp.dest("dist/stylesheets"));
})
gulp.task("css",()=>{
    return gulp.src(["stylesheets/*.css"])
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/stylesheets"))
})
gulp.task("sass",()=>{
    return gulp.src(["sass/*.scss"])
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/stylesheets"))
})
gulp.task("watch",()=>{
    gulp.watch("*.html",["html"])
    gulp.watch("images/*.*",["html","images"]);
    gulp.watch("javascripts/*.js",["html","javascripts"])
    gulp.watch("sass/*.scss",["html","sass"])

})

gulp.task('connect',function() {
    connect.server({
        port:8000,
        root:"dist/",
        livereload:true,
        middleware:function(connect , opt){
            var Proxy = require('gulp-connect-proxy');
            opt.route='/proxy';
            var proxy=new Proxy(opt);
            return [proxy]
        }
    })
})
gulp.task("default",["watch","connect","html","script","images","sass"]);