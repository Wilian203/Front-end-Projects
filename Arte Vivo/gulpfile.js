import fs from 'fs';              // Módulo para trabajar con archivos
import path from 'path';          // Módulo para manejar rutas de archivos
import sharp from 'sharp';        // Librería para procesar imágenes (redimensionar, comprimir, etc.)
import { glob } from 'glob';


// Importa funciones principales de Gulp: src (origen de archivos), dest (destino), watch (vigilar cambios), series (ejecutar tareas en orden)
import { src, dest, watch, series } from 'gulp'

// Importa todas las funciones del compilador oficial de Sass (Dart Sass)
import * as dartSass from 'sass'

// Importa el plugin gulp-sass, que permite a Gulp trabajar con archivos .scss
import gulpSass from 'gulp-sass'

// Conecta gulp-sass con Dart Sass para poder compilar Sass
const sass = gulpSass(dartSass)

// terser es una libreria de terceros para minificar codigo de js
import terser from 'gulp-terser';



// Tarea para copiar archivos JavaScript
// La función 'js' copia el archivo 'app.js' desde 'src/js' a 'build/js'
// 'done()' indica que la tarea ha terminado correctamente
export function js( done ) {
    src('src/js/app.js')         // Ubica el archivo JavaScript de origen
        .pipe(terser())
        .pipe( dest('build/js') ) // Copia el archivo al destino

    done() // Finaliza la tarea
}


// Tarea para compilar archivos Sass a CSS
// La función 'css' busca el archivo SCSS, lo compila y lo guarda como CSS
export function css( done ) {
    src('src/scss/app.scss', { sourcemaps: true }) // Ubica el archivo .scss y activa los sourcemaps
        .pipe( sass({
          // minifica el codigo de css haciendolo mas ligero
           style:'compressed'
        }).on('error', sass.logError) )  // Compila Sass y muestra errores si hay
        .pipe( dest('build/css', { sourcemaps: '.' }) ) // Guarda el archivo CSS compilado en la carpeta destino con sourcemaps

    done() // Finaliza la tarea
}


// Función que se queda "escuchando" cambios en archivos SCSS o JS
// Si hay cambios, vuelve a ejecutar la tarea correspondiente automáticamente
export function dev() {
    watch('src/scss/**/*.scss', css); // Observa todos los archivos .scss dentro de la carpeta y subcarpetas
    watch('src/js/**/*.js', js);      // Observa todos los archivos .js dentro de la carpeta y subcarpetas
    watch('src/img/**/*.{png,jpg}', imagenes)  
}



// Función principal: procesa todas las imágenes encontradas
export async function imagenes(done) {
    // === ⚙️ CONFIGURACIÓN QUE PUEDES CAMBIAR ===
    const srcDir = './src/img';       // 📁 Carpeta donde están las imágenes originales
    const buildDir = './build/img';   // 📁 Carpeta de salida para imágenes optimizadas

    // Busca recursivamente todas las imágenes .jpg y .png en la carpeta srcDir
    const images = await glob('./src/img/**/*.{jpg,png}'); // Puedes agregar otros formatos si quieres

    // Procesa cada imagen encontrada
    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file)); // Ruta relativa
        const outputSubDir = path.join(buildDir, relativePath);         // Carpeta destino
        procesarImagenes(file, outputSubDir); // Llama a la función que hace el trabajo
    });

    // Informa que ha terminado el proceso (si se usa con Gulp, por ejemplo)
    done();
}

// Función que procesa una sola imagen: genera versión optimizada y .webp
function procesarImagenes(file, outputSubDir) {
    // Si la carpeta destino no existe, la crea
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    }

    // Saca el nombre base y la extensión original del archivo
    const baseName = path.basename(file, path.extname(file)); // ejemplo: "foto1"
    const extName = path.extname(file);                       // ejemplo: ".jpg"

    // Crea rutas completas de salida
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);      // versión optimizada original
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);       // versión WebP
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);       // versión WebP
    

    // Opciones de compresión/calidad (ajustables)
    const options = { quality: 80 }; // Puedes bajar la calidad si quieres menor peso

    // Procesa imagen en su formato original (optimizado)
    sharp(file)
        .resize({ // 👉 Puedes quitar esto si no quieres cambiar el tamaño
            width: 1200, // Ancho deseado (puedes cambiarlo)
            withoutEnlargement: true // No agranda imágenes más pequeñas
        })
        .toFormat('jpeg', options)
        .toFile(outputFile);

    // Crea versión en WebP
    sharp(file)
        .resize({
            width: 1200,
            withoutEnlargement: true
        })
        .webp(options)
        .toFile(outputFileWebp);

    // Crea versión en avif
    sharp(file)
        .resize({
            width: 1200,
            withoutEnlargement: true
        })
        .avif()
        .toFile(outputFileAvif);
};




// Exporta la tarea por defecto
// Ejecuta en orden: primero js, luego css y luego inicia el modo de desarrollo con 'watch'
export default series(js, css, imagenes, dev)


