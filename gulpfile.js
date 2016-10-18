var gulp = require('gulp'); // sirve para automatizar tareas repetitivas
var sass = require('gulp-sass'); // modulo de gulp para compilar sass, a css
var uglify = require('gulp-uglify'); // modulo de gulp, para minificar los archivos js
var cssnano = require('gulp-cssnano'); // modulo de gulp, para minificar los archivos css
var imagemin = require('gulp-imagemin'); //comprime y mejora la ocupacion  de las imagenes jpg, png, svg
var autoprefixer = require('gulp-autoprefixer'); // Añade los prefijos css, de las caracteristicas no soportadas por los navegadores
var htmlmin = require('gulp-htmlmin'); //Sirve para minificar los ficheros html
var browserSync = require('browser-sync').create(); //para recargar el navegador

// Static Server + watching scss/html files
// Crea un servidor para el html y vigila los cambios en los archivos html, scss, javascript y los aplica en el servidor, 
// comprimir -- Comprime y uglifica ficheros js para que ocupen menos
// sass -- Convierte ficheros sass, a css, y la propia funcion tambien minifica
// change -- Recarga el html, si hay algun cambio
gulp.task('default', ['css','javascript'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch("jss/*.js", ['javascript']).on('change', browserSync.reload);
    gulp.watch("scss/**/*.scss", ['css']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("./*.html", ["html"]);
});

//Minifica el html, para que ocupe menos
gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app'));
});

//Sirve para convertir el archivo sass a css y comprimirlo
gulp.task('css', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass()) // sass se compila en css
        .pipe(cssnano()) // esto hace que se uglyfique y se minimice -- SOLO TEMPORAL
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],  //Controla el numero de versiones antiguas que se revisaran
            cascade: false
        }))
        .pipe(gulp.dest('app/css')) // lo guarda en la carpeta que se quiera
        .pipe(browserSync.stream()); // actualiza el navegador
});

//Sirve para minificar el archivo js
gulp.task('javascript', function () {
    gulp.src('jss/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

//sirve para minificar imagenes, no se incluye en el automatismo, para que no se haga en automatico
// cada vez que se guarde fichero
gulp.task('imagenes', function () {
    gulp.src('img-original/*') // cuidado!!!, hay que dejar solo imagenes reconocibles en esa carpeta
        .pipe(imagemin())    
        .pipe(gulp.dest('app/img'))
});
