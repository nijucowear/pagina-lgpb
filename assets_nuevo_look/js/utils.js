$raiz = '';
if(window.location.href.indexOf("app_dev.html") > -1) {
    $raiz = 'app_dev.html';
}

function horario(sec){

    console.log('popUp');

    var img = $(sec).data('imagen');
    var link = $(sec).data('link');
    console.log('link', link);

    var popUp = '<div class="overlay popup-g"></div>'+
        '<div class="popup-g contenido imagen-pedido-exitoso"><a href="'+link+'"><img src="'+img+'"/></a><a class="close"><img src="/images/basic/close_modal.png"/></a></div>';

    setTimeout(function(){
        $('body').append(popUp);
        setTimeout(function(){
            $('.popup-g').addClass('view');
        }, 500);
        $('.popup-g .close').click(function () {
            $('.popup-g').removeClass('view');
            setTimeout(function(){
                $('.popup-g').remove();
            }, 500);
        });
    }, 1000);

}

$(function () {

    $('.celebras-especial input').on('click', function(){
        var check = $('#si-celebra').prop("checked");
        if(check){
          $('.comentraio-celebras').css('display', 'flex');
          $('#reservas_comentarios').attr('required',true);
        }else{
           $('.comentraio-celebras').hide();
            $('#reservas_comentarios').attr('required',false);
        }
    });

    /* $("#si-celebra").prop("checked", true); */
    
    $('.horariorestaurante').click(function (){
        horario($(this));
    });

    
    if($('#calendar').length > 0){

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'es',
            initialView: 'dayGridMonth',
            weekends: true,
            /* defaultView: 'agendaWeek',
            views: {
                week: {
                titleFormat: '[Week from] D MMMM YYYY',
                titleRangeSeparator: ' to ',
                }
            }, */
            views: {
                dayGridMonth: { // name of view
                titleFormat: { month: 'long' }
                // other view-specific options here
                }
            },
            headerToolbar:{
                start: 'prev', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: 'next' // will normally be on the right. if RTL, will be on the left
            },
            events:eventosrestaurantes,
            eventClick: function(info) {
                $('.poster').attr('src',info.event.extendedProps.image);
                $('.enlaceevento').attr('href',info.event.extendedProps.url)
            }

        });

    //calendar.render();


        $('#eventos').on('click', function(){
            calendarios();
        });

        function calendarios(){

            console.log('popUp calendarios');

            var popUp = '<div class="overlay popup-g"></div>';

            setTimeout(function(){
                $('body').append(popUp);
                
                $('.popup-g, .calendario-eventos-nuevo').addClass('view');
                
                SwiperEventos();

                $('.calendario-eventos-nuevo .close').on('click', function() {
                    $('.popup-g, .calendario-eventos-nuevo').removeClass('view');
                    setTimeout(function(){
                        $('.popup-g').remove();
                    }, 500);
                });

            }, 1000);

        }

    }

    function SwiperEventos(){
        const swiperEventosPop = new Swiper('.swiper-eventos-popup', {
            loop: true,
            speed: 2000,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-eventos-popup .swiper-pagination',
            },
            navigation: {
                nextEl: '.siguiente-calendario',
                prevEl: '.anterior-calendario',
            },
            on: {
                slideChange: function () {
                    const currentSlide = this.slides[this.activeIndex];
                    const enlace = $(currentSlide).find('.poster').data('enlace');
                    const logo = $(currentSlide).find('.poster').data('logo');
                    $('.enlaceevento').attr('href', enlace);
                    if(logo)
                     $('.logo').attr('src',logo);
                }
            }
        });
    }

    console.log('casas');
    const swiperCasas = new Swiper('.swiper-casa', {
        effect: 'fade',

        loop: true,
        speed: 2000,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
        }
    });

    /* $('#horario').on('click', function(){
        horarios();
    }); */

    function horarios(){

        console.log('popUp horarios');

        var img = $('.data-horario').data('imagen');
        /* var link = $('.data-horario').data('link');
        console.log('link', link); */

        var popUp = '<div class="overlay popup-g"></div>'+
            '<div class="popup-g contenido imagen-pedido-exitoso"><img src="'+img+'"/><a class="close"><img src="/images/basic/close_modal.png"/></a></div>';

        setTimeout(function(){
            $('body').append(popUp);
            setTimeout(function(){
                $('.popup-g').addClass('view');
            }, 500);
            $('.popup-g .close').on('click', function () {
                $('.popup-g').removeClass('view');
                setTimeout(function(){
                    $('.popup-g').remove();
                }, 500);
            });
        }, 1000);
        
    }

    console.log('nuevo look');

    var wWindow = $(window).outerWidth();

    if(wWindow < 768){
        const swiperEventos = new Swiper('.swiper-eventos', {
            loop: false,
            speed: 2000,
            slidesPerView: 1,
            spaceBetween: 10,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-eventos .swiper-pagination',
            },
            navigation: {
                nextEl: '.eventos_nuevo_look .swiper-button-next',
                prevEl: '.eventos_nuevo_look .swiper-button-prev',
            }
        });
    }

    const swiperFooterProductos = new Swiper('.swiper-productos', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 8000,
        },
        pagination: {
            el: '.swiper-productos .swiper-pagination',
        },
        navigation: {
            nextEl: '.next-producto',
            prevEl: '.prev-producto',
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    cositasMEnu();
    noticiasBlog();
});


function noticiasBlog(){
    $('.thumbs_post .post').each(function(){
        var paragrafo = $(this).find('p').text();
        var imgW = $(this).find('.img img').outerWidth();
        var imgH = $(this).find('.img img').outerHeight();
        if(paragrafo == ''){
            $(this).find('p').remove();
        }
        console.log('imgW', imgW);
        console.log('imgH', imgH);

        if( imgW > imgH ){
            $(this).addClass('horizontal');
        }
    });
}


function cositasMEnu(){

    $('.mostrar-cositas').on('click', function(){
        $('.menu-cositas').addClass('view');
    });

    $('.ocultar-cositas').on('click', function(){
        $('.menu-cositas').removeClass('view');
    });
}

/* function popUp(){

} */
