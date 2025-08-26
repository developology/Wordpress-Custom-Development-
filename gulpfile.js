const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Paths
const paths = {
  scss: "assets/scss/**/*.scss",
  js: "assets/js/**/*.js",
  dist: "assets/dist"
};

// Compile SCSS → CSS + Minify
function styles() {
  return gulp.src("assets/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.dist))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream()); 
}

// Concat + Minify JS
function scripts() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("custom.js"))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream()); 
}

// Serve with BrowserSync
function serve() {
  browserSync.init({
    proxy: "http://day1.test", 
    open: true,                 
    notify: false            
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
  gulp.watch("**/*.php").on("change", browserSync.reload);
}


exports.default = gulp.series(styles, scripts, serve);
