const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_DIR = path.resolve(__dirname, 'src');
const LIB_DIR = path.resolve(__dirname, 'lib');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'clean:public', 'build:ts', 'build:copy-lib', 'build:browserify', 'build:copy-public', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(LIB_DIR)));

gulp.task('build:copy-lib', (callback) => {
  gulp.src([
    `${SRC_DIR}/**/*`,
    `!${SRC_DIR}/**/*.ts`
  ]).pipe(gulp.dest(LIB_DIR))
  .on('end', callback);
});

gulp.task('build:browserify', () => {
});

gulp.task('build:copy-public', (callback) => {
  gulp.src([
    `${LIB_DIR}/public/css/simplemde-theme-base/**/*`,
  ], {
    base: `${LIB_DIR}/public`,
  }).pipe(gulp.dest(PUBLIC_DIR))
  .on('end', callback);
});

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});

gulp.task('clean:public', () => {
  rimraf.sync(`${PUBLIC_DIR}/*`);
});
