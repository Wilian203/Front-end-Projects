const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000, // Tiempo en milisegundos (5000 ms = 5 segundos)
    disableOnInteraction: false, // Permite que continúe el autoplay después de interacción manual
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});
