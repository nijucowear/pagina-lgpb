function aload(t){
    "use strict";
    var e="data-aload";
    return t=t||window.document.querySelectorAll("["+e+"]"),void 0===t.length&&(t=[t]),[].forEach.call(t,function(t){t["LINK"!==t.tagName?"src":"href"]=t.getAttribute(e),t.removeAttribute(e)/*,t.style.display= "block"*/}),t}
$raiz = '';
if(window.location.href.indexOf("app_dev.html") > -1) {
    $raiz = 'app_dev.html';
}

var windowWidth = $(window).outerWidth();

$(function() {

    $(document).on('opened', '.modalReservaCasa', function () {

        console.log('ModalReservaq is opening');

        $('.stretch').each(function () {
            var wparent = $(this).parent().outerWidth();
            var wlabel = $(this).parent().find('label').outerWidth();
            var percentage = wparent * 0.15;

            var witem = (wparent - wlabel) - percentage;

            $(this).css('width', witem);

        });

    });

    $(document).on('closed', '.modalReservaCasa', function () {
        console.log('Modal is opened');
        if(!isMobile()) {
            $('.resize').css('width', windowWidth);
        }
    });



    if(!isMobile()){

        $(".galeria_n .thumps").mCustomScrollbar({
            scrollbarPosition: "outside",
            autoHideScrollbar: true
        });


    }

    /*var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });*/

    $(document).on('opened', '.modal_Gal_Casa', function () {
        console.log('modal galeria');
        var swiperGal = new Swiper('.modal_Gal_Casa .swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        swiperGal.slideTo(pos_gal);

    });

});

function myFunction() {
    location.reload();
}

function isMobile() {
    return(/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
}