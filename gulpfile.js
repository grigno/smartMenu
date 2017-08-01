var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var del = require('del');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var bower = require('main-bower-files');


gulp.task('clean', del.bind(null, ['dist', '!node_modules/**', '!bower_components/**']))
gulp.task('build', ['vendor:js', 'styles', 'app:js'], function (cb) {
  cb();
});
gulp.task('serve', ['build'], function () {
  gulp.watch([
    'src/**/*'
  ]).on('change', reload);

  browserSync.init({
    notify: false,
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('src/css/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['app:js']);
});

gulp.task('styles', function () {
  return gulp.src('src/css/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
    ]))
    .pipe(concat('smartMenu.css'))
    .pipe(cssnano({'zindex': false}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
});

gulp.task('vendor:js', function () {
  return gulp.src(bower('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/vendor'))
});

gulp.task('app:js', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('smartMenu.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

