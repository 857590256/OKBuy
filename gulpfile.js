const gulp = require("gulp");
// gulp 服务器插件;
const connect = require("gulp-connect");
// gulp 合并插件;
const concat = require('gulp-concat');
// gulp 压缩插件;
const uglify = require("gulp-uglify");
// babel 插件;
const babel = require("gulp-babel");
// css 插件;
const cleanCss = require("gulp-clean-css");
// sass 编译插件;
const sass = require("gulp-sass-china");

const proxy=require("http-proxy-middleware");

gulp.task("html",()=>{
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
gulp.task("script",()=>{
    return gulp.src(["script/*.js"])
    // .pipe(concat("mian.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("dist/script"))
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
    return gulp.src(["styles/*.css"])
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/css"))
})
gulp.task("sass",()=>{
    return gulp.src(["sass/*.scss"])
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("styles"))
})
gulp.task("watch",()=>{
    gulp.watch("*.html",["html"])
    gulp.watch("images/*.*",["html","images"]);
    gulp.watch("script/*.js",["html","script"])
    gulp.watch("sass/*.scss",["html","sass"])

})

gulp.task('connect', function() {
    connect.server({
        port:"8080",
        root:"dist/",
        livereload:true,
        // 中间件;
        // middleware:function(connect , opt){
        //     var Proxy = require('gulp-connect-proxy');
        //     opt.route = '/proxy';
        //     var proxy = new Proxy(opt);
        //     return [proxy];
        // }
        middleware:function(){
            return [
                proxy("/api",{
                    target:"http://localhost:3000",
                    pathRewrite: {
                        '^/api' : '/',     // rewrite path
                    }
                })
            ]
        }
    })
});
gulp.task("es6",()=>{
    return gulp.src("es6/*.js")
    .pipe(babel({
        presets :['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"))
})
gulp.task("default",["watch","connect","html","script","images","sass","es6"]);