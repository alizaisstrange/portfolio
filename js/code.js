gsap
.timeline({
  defaults: {
    duration: 1
  }
})
.add('start')
.from('.about-me__title', {
  y: 100,
  opacity: 0
}, 'start')
.from('.about-me__buttons', {
  y: 100,
  opacity: 0
}, 'start')
.from('.about-me__text', {
  opacity: 0
}, 'start+=1')
.from('.about-me__photo', {
  scale: 0.5,
  opacity: 0
}, 'start+=1.3')

var btnResets = document.querySelectorAll(".btn-reset");
var menu = document.querySelector("div.menu");
var tl = new TimelineLite({paused:true, onReverseComplete:reverseFunction}); //pause default
tl.from(".nav__list", {y: 20, opacity: 0}, 'start+=1')
tl.from(".menu__top", {opacity: 0.5,  backgroundPosition: "0px -50px"}, 'start')
tl.from(".social", {y: 20, opacity: 0}, 'start+=1.5')
tl.from(".menu__right", {y: 20, opacity: 0}, 'start+=1.5')
tl.from(".menu__container", {opacity: 0.5, backgroundPosition: "0px 50px"}, 'start+=0.5')


function reverseFunction() {
  menu.classList.remove('menu--open');
}

for (let btnReset of btnResets) {
  btnReset.onclick = function() {
    if(menu.classList.contains('menu--open')) {
      tl.reverse();
    }
    else {
      menu.classList.add('menu--open');
      tl.play();
    }
  }
}


$(document).ready (function () {

  // Мобильное меню
  const toggleMenu = document.querySelector('.toggle-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const headerOverlay = document.querySelector('.header-overlay');
  const noscroll = document.body;


  toggleMenu.addEventListener('click', function(){

      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      headerOverlay.classList.toggle('active');
      noscroll.classList.toggle('noscroll');
      
  })

  mobileMenu.addEventListener('click', function(){

      this.classList.remove('active');
      toggleMenu.classList.remove('active');
      headerOverlay.classList.remove('active');
      noscroll.classList.remove('noscroll');
      
  })

  headerOverlay.addEventListener('click', function(){

      mobileMenu.classList.remove('active');
      toggleMenu.classList.remove('active');
      headerOverlay.classList.remove('active');
      noscroll.classList.remove('noscroll');
      
  })

  // Фильтрация проектов
  let containerEl = document.querySelector('#portfolio-card');
  let mixer = mixitup(containerEl,{
          classNames: {
              block: ""
          }
  })

  // Изменение размеров карточек
  const filterToggles = document.querySelectorAll('.portfolio-menu button');
  const portfolioBigCards = document.querySelectorAll('.portfolio-card');

  for (let i = 0; i < filterToggles.length; i++) {
      filterToggles[i].addEventListener('click', function () {
          if (i == 0) {
              for (let j = 0; j < 2; j++) {
                  portfolioBigCards[j].classList.add('portfolio-card-big')
              }
           } else {
              for (let j = 0; j < 2; j++) {
                  portfolioBigCards[j].classList.remove ('portfolio-card-big')
              }
          }
      })
  }

  // form placeholder
  const formItems = document.querySelectorAll('.form-field');
      
  for(let item of formItems){
      const thisParent = item.closest('.form-item');
      const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
      // Если инпут в фокусе		
      item.addEventListener('focus', function(){
          thisPlaceholder.classList.add('active');
      });

      // Если инпут теряет фокус
      item.addEventListener('blur', function(){
          
          if(item.classList.contains('phone')){
            let phone = document.querySelector('.phone');
      let arr = [];
      for(let i = 0; i < phone.value.length; i++){
          if(phone.value.charCodeAt(i) > 47 && phone.value.charCodeAt(i) < 58) arr.push(phone.value[i])}
      
      if(arr.length != 11) thisPlaceholder.classList.remove('active')
          }
          else {
            if(item.value.length > 0){
              thisPlaceholder.classList.add('active');
              }
              else{
                  thisPlaceholder.classList.remove('active');
              }
          }
      })
  }

  //FORM VALIDATE
$('.contacts-form').validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    subject: {
      required: true
    },
    message: {
      required: true
    }
  },
  messages: {
    email: {
      required: 'Введите Ваш Email',
      email: 'Отсутсвует символ @'
    },
    subject: {
      required: 'Введите тему сообщения'
    },
    message: {
      required: 'Введите текст сообщения'
    }
  },
  submitHandler: function (form) {
    ajaxFormSubmit();
  }
  });

  //валидация поле телефона 
  $(".phone").mask("+7 (999) 999-99-99");
  //ф-ция для позиции курсора
  $.fn.setCursorPosition = function (pos) {
      if ($(this).get(0).setSelectionRange) {
          $(this).get(0).setSelectionRange(pos, pos);
      } else if ($(this).get(0).createTextRange) {
          var range = $(this).get(0).createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
      }
  };
  //ф-ция для позиции курсора для нашего поля phone
  $('.phone').click(function () {
      $(this).setCursorPosition(4); // set position number
  });
  
  // Функция AJAX запрса на сервер

function ajaxFormSubmit() {

  let string = $(".contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

  //Формируем ajax запрос
  $.ajax({
    type: "POST", // Тип запроса - POST
    url: "php/mail.php", // Куда отправляем запрос
    data: string, // Какие даные отправляем, в данном случае отправляем переменную string

    // Функция если все прошло успешно
    success: function (html) {
      $(".contacts-form").slideUp(800);
      $('#answer').html(html);
    }
  });
  // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
  return false;
  }


  // Навигация
  $('#page-nav').onePageNav({
      currentClass: 'active',
      changeHads: false,
      scrollSpeed:750,
      scrollThreshold: 0.5,
      filter: '',
      easing: 'swing',
      begin: function () {},
      end: function () {},
      scrollChange: function ($currentListItem) {}
  });



  // Смотреть все работы
  const hideCard = document.querySelectorAll('.portfolio-card');
  const allJobsButton = document.querySelector('.all-jobs-link');

  allJobsButton.addEventListener('click', function(){

      this.classList.toggle('hide-link');
      for(let item of hideCard){
          item.classList.remove('hide-card');
          };    
  });


  // показать кнопку скролл вверх
  $('#backTop').hide();
  $(window).scroll(function(){
      if($(this).width() < 1200){
          if( $(this).scrollTop() > 300 ){
              $('#backTop').fadeIn();
          }
          else{
              $('#backTop').fadeOut();
          }
      }
  });

})