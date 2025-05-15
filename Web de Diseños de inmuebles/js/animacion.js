$(document).ready(function() {
    // Animación del menú
    $('.nav__enlaces li').each(function(index) {
        $(this).delay(200 * index).animate({
            top: '0',
            opacity: 1
        }, 500);
    });

    // Animación del header
    $('.header__contenido').delay(1000).animate({
        top: '0',
        opacity: 1
    }, 500);
});
