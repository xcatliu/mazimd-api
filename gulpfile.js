const exec = require('child_process').exec;
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const SRC_DIR = path.resolve(__dirname, 'src');
const LIB_DIR = path.resolve(__dirname, 'lib');

gulp.task('default', () => {
  runSequence('build', 'serve');
});

gulp.task('build', (callback) => {
  runSequence('clean:lib', 'build:ts', callback);
});

gulp.task('build:ts', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(LIB_DIR)));

gulp.task('clean:lib', () => {
  rimraf.sync(`${LIB_DIR}/*`);
});

gulp.task('serve', () => {
  const cp = exec('node lib/app');
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
});

process.on('SIGINT', () => {
  console.log('Successfully closd ' + process.pid);
  console.log('Goodbye!');
  process.exit(1);
});
