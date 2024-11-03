/*=============== SWIPER JS PARA O SEGUNDO ANDAR ===============*/
let swiperCardsVerde = new Swiper(".andar.swiper.card__contentVerde", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: ".swiper-pagination-verde",
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: ".swiper-button-next-verde",
      prevEl: ".swiper-button-prev-verde",
    },
  
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      968: {
        slidesPerView: 4,
      },
    },
  });