const swiper = new Swiper('.swiper', {
    
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      // Cuando la ventana sea >= 390px
      390: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // Cuando la ventana sea >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      // Cuando la ventana sea >= 1024px
      1024: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
    },
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
  });

   // codigo para scrooll
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1300; // Duración en milisegundos (ajusta según sea necesario)
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const ease = easeInOutCubic(progress / duration);
            window.scrollTo(0, startPosition + (distance * ease));

            if (progress < duration) window.requestAnimationFrame(step);
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        window.requestAnimationFrame(step);
    });
});


