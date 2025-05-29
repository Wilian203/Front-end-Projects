document.addEventListener('DOMContentLoaded', function(){
   navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

// fijamos la navegacion cuando detecte por scroll cuando sea menor a 1
function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria(){
    const galeria_imagenes = document.querySelector('.galeria-imagenes')
    let Cantidad_imagenes = 16;
    for(let i = 1; i <= Cantidad_imagenes; i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        // Event Handler
        imagen.onclick = function(){
           mostrarImagen(i)
        }
       galeria_imagenes.appendChild(imagen)
    };
};


function mostrarImagen(i){
    // creamos la imgen a mostar en el modal
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    // creamos el modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.appendChild(imagen);

    // cerramos el modal
    modal.onclick = cerrarModal;

    // Botón cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;
    modal.appendChild(cerrarModalBtn);

    // agregar el modal al body
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
};


function cerrarModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(()=>{
        modal?.remove();
        document.querySelector('body').classList.remove('overflow-hidden')
   
    },500); 
};

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach( section => {
            // detenca la distancia desde la seccion hasta el tope del body
            const sectionTop = section.offsetTop
            // detecta el tamaño de la seccion
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            };
        });

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            };
        });
    });
};

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        });
    });
};