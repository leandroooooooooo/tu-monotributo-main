const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Tarea para compilar SASS a CSS
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Ruta de tus archivos SCSS
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/stylesheets')) // Ruta de salida de los archivos CSS compilados
    .pipe(browserSync.stream());
});

// Tarea para iniciar el servidor y observar cambios en los archivos
gulp.task('serve', function() {
  browserSync.init({
    server: './' // Cambia esto a la ruta donde tienes tu index.html
  });

  gulp.watch('scss/**/*.scss', gulp.series('sass')); // Observa cambios en archivos SCSS
  gulp.watch('*.html').on('change', browserSync.reload); // Observa cambios en archivos HTML
});

// Tarea por defecto
gulp.task('default', gulp.series('sass', 'serve'));
