const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const LIB_DIR = path.resolve(__dirname, 'lib');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'build:ts', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('lib')));

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});
