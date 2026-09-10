function aload(t){
    "use strict";
    var e="data-aload";
    return t=t||window.document.querySelectorAll("["+e+"]"),void 0===t.length&&(t=[t]),[].forEach.call(t,function(t){t["LINK"!==t.tagName?"src":"href"]=t.getAttribute(e),t.removeAttribute(e)/*,t.style.display= "block"*/}),t}
$raiz = '';
if(window.location.href.indexOf("app_dev.html") > -1) {
    $raiz = 'app_dev.html';
}

var scrollPosition = 0;

var cMenumega = $(".comoLlegar .col:nth-of-type(1)");

var menuMega = $(".comoLlegar .col .op_fix");

var menuMW = 0;

var menuWajustado = 0;

var offsetTop = 0;

var offsetLeft = 0;




$(function(){

    console.log('como llegar');

    offsetTop = menuMega.offset().top;
    offsetLeft = cMenumega.offset().left;
    menuMW = cMenumega.outerWidth();
    menuPaddingL = parseInt(menuMega.css('padding-left'));
    menuWajustado = menuMW - (parseInt(menuPaddingL)*2);


    if (!isMobile()) {

        $('.direccion22 .item h2').flowtype({
            fontRatio: 7,
            maxFont: 30
        });
        $('.direccion .item p').flowtype({
            fontRatio: 13,
            maxFont: 18
        });
    }

    fixMapa();

    if (isMobile()) {
        $('.direccion .item').click(function () {
            TweenMax.to($('.menu_celu'), 0.5, { left: "5%"});
        });

        $('.menu_celu .cerrar_menu').click(function () {
            TweenMax.to($('.menu_celu'), 0.5, { left: "-100%"});
        });
    }

});


$(window).resize(function(){
    offsetTop = menuMega.offset().top;
    offsetLeft = cMenumega.offset().left;
    menuMW = cMenumega.outerWidth();
    menuPaddingL = parseInt(menuMega.css('padding-left'));
    menuWajustado = menuMW - (parseInt(menuPaddingL)*2);

});


$(window).on( 'scroll', function(){

    scrollPosition = $(window).scrollTop();
    fixMapa();

});



function fixMapa(){


    if(!isMobile()) {
        if (scrollPosition > offsetTop - 50 || 1) {
            //console.log('aqui jue');
            menuMega.css({
                'position': 'fixed',
                'left': offsetLeft,
                'width': menuWajustado,
                'margin-top': 0
                /*'padding-left': menuPaddingL,
                'padding-right': menuPaddingL*/

            });
        }else {
            menuMega.css({
                'position': 'relative',
                'width': '100%',
                'left': 'inherit',
            });
        }
    }



    /*
        if(menuMega.length > 0 && ofstTop == 0 && menuMW == 0){

        }

      */

}


function isMobile() {
    return(/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
}