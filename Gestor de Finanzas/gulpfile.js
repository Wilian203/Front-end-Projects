const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');

// JS
const terser = require('gulp-terser')

function js(done) {
  src('src/js/app.js')
    .pipe(plumber())            // Evita que se caiga ante errores
    .pipe(terser())             // Minifica el JS
    .pipe(dest('build/js'))
    .pipe(dest('dist/js'));    // Guarda el archivo en destino

  done();
};


function css( done ) {
    src('src/scss/app.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.error('Error en CSS:', err.message);
            this.emit('end'); // Finaliza el flujo sin detener Gulp
        }
    }))
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )
        .pipe( dest('dist/css') )

    done();
};


function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch('src/js/**/*.js',js);
};


exports.css = css;
exports.dev = dev;
exports.default = series( css, js, dev  );
exports.build = series(css, js); // nueva tarea para Netlify