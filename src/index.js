
import '@babel/polyfill';
import './index.html';
import './index.scss';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 15,
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: {
      initialSlide: 0,
      spaceBetween: 0,
      enabled: false
    }
  }
});

const clientWidth = document.body.clientWidth;
const slider = document.querySelector('.slider');
const buttonExpand = document.querySelectorAll('.button-expand');
const sliderWraper = slider.querySelector('.slider__wrapper');
const swiperSlide = slider.querySelectorAll('.swiper-slide');

const newSlide = slider.querySelector('.newSlide').content.querySelector('.slider__slide'); // шаблон для нового  слайда

const contentAdd = function (link, altLink) {
  newSlide.children[0].src = link;
  newSlide.children[0].alt = altLink;
  return newSlide
}
const bluer = document.querySelector('.bluer');

const listener = function(buttonClass, modalClass, ){ // прослушка кнопок по  классу кнопки и классу модалки
  const button = document.querySelectorAll(`.${buttonClass}`);
  const selector = document.querySelector(`.${modalClass}`);
  const buttonCancel = selector.querySelector('.button_cancel');
  for (let index = 0; index < button.length; index++) {
    const element = button[index];
    element.addEventListener('click', function() {
      selector.classList.add(`${modalClass}--open`); 
      bluer.classList.add('bluer-open');
    })
    buttonCancel.addEventListener('click', function() {
      selector.classList.remove(`${modalClass}--open`);
      bluer.classList.remove('bluer-open');
    })
    bluer.addEventListener('click', function() {
      selector.classList.remove(`${modalClass}--open`);
      bluer.classList.remove('bluer-open');
    })
  }
}

listener('button-burger', 'modal-menu') // названия селекторов (кнопка и модалка) без '.'
listener('button-repair', 'modal-feedback')
listener('button-checkstatus', 'modal-call')
listener('button-burger', 'modal-menu')


if (clientWidth > 765)  {
  
  for (let i = 0; i < swiperSlide.length; i++) {
    const element = swiperSlide[i];
    element.classList.remove('swiper-slide')
  }
  slider.classList.remove('swiper');
  sliderWraper.classList.remove('swiper-wrapper');
  document.querySelector('.swiper-pagination').remove();
  sliderWraper.appendChild(contentAdd('./assets/Sony.png', 'Sony').cloneNode(true));
  sliderWraper.appendChild(contentAdd('./assets/Bosch.png', 'Bosch').cloneNode(true));

}

for (let index = 0; index < buttonExpand.length; index++) {
  let selector = buttonExpand[index].parentNode
  let expand = buttonExpand[index];
  let wrapper = selector.querySelector('.content')
  let text = expand.querySelector('.button__text')
  let textContent = text.textContent
  
  expand.addEventListener('click', function() {
    expand.classList.toggle('button-narrow');
    wrapper.classList.toggle('content-narrow');
    text.classList.toggle('text-narrow')

    if(expand.classList.contains('button-narrow')) {
      text.textContent ='Скрыть'
    } else {
      text.textContent = textContent
    }
  })
}

