const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyes, console);

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_DIR = path.resolve(__dirname, 'src');
const LIB_DIR = path.resolve(__dirname, 'lib');

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'build:ts', 'build:copy-views', 'build:browserify', 'build:copy-css', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(LIB_DIR)));

gulp.task('build:copy-views', (callback) => {
  gulp.src([
    `${SRC_DIR}/views/**/*`,
  ]).pipe(gulp.dest(`${LIB_DIR}/views`))
  .on('end', callback);
});

gulp.task('build:browserify', () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/public/js/pages/new.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('new.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(minify())
  .on('error', function (err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('lib/public/js/pages'));
});

gulp.task('build:copy-css', (callback) => {
  gulp.src([
    `${SRC_DIR}/**/*.css`,
    `${SRC_DIR}/**/*.css.map`,
  ]).pipe(gulp.dest(LIB_DIR))
  .on('end', callback);
});

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});
