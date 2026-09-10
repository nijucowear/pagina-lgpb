function aload(t){
    "use strict";
    var e="data-aload";
    return t=t||window.document.querySelectorAll("["+e+"]"),void 0===t.length&&(t=[t]),[].forEach.call(t,function(t){t["LINK"!==t.tagName?"src":"href"]=t.getAttribute(e),t.removeAttribute(e)/*,t.style.display= "block"*/}),t}
$raiz = '';
if(window.location.href.indexOf("app_dev.html") > -1) {
    $raiz = '../../app_dev.html';
}

var scrollPosition = 0;

var cMenumega = $(".wrapper_menu_mega");

var menuMega = $(".menu_megafono");

var menuMW = 0;

var menuPaddingL = 0;

var menuWajustado = 0;

var offsetTop = 0;

var offsetLeft = 0;

var hTitulo = 0;

$(function(){
    //console.log('megafono');

    offsetTop = menuMega.offset().top;
    offsetLeft = cMenumega.offset().left;
    menuMW = cMenumega.outerWidth();
    menuPaddingL = parseInt(menuMega.css('padding-left'));
    menuWajustado = menuMW - (parseInt(menuPaddingL)*2);
    //console.log('menuWajustado' + menuWajustado);

    if (!isMobile()) {

        $('.menu_casa ul li a span').flowtype({
            fontRatio: 10,
            maxFont: 30
        });

        $('.megafono .thumbs_post .post .txt h3').flowtype({
            fontRatio: 10,
            maxFont: 29
        });

        $('.megafono .thumbs_post .post .txt p').flowtype({
            fontRatio: 12,
            maxFont: 12
        });

        $('.megafono .wrapper .menu_megafono ul li a span:nth-of-type(2)').flowtype({
            fontRatio: 10,
            maxFont: 20
        });

        $('.megafono .cont_megafono .banner .col .titulo_sec h2').flowtype({
            fontRatio: 18,
            maxFont: 24
        });

        $(".megafono .thumbs_post .post .txt p").dotdotdot({
            ellipsis: "\u2026 "
        });
    }

    fixMenuMegafono();
    heightTitulo();


});


$(window).resize(function(){
    offsetTop = menuMega.offset().top;
    offsetLeft = cMenumega.offset().left;
    menuMW = cMenumega.outerWidth();
    menuPaddingL = parseInt(menuMega.css('padding-left'));
    menuWajustado = menuMW - (parseInt(menuPaddingL)*2);
    hTitulo = $('.cont_megafono .banner .col .titulo').outerHeight();
    //console.log('width menuW' + menuMW);
    heightTitulo();
});


$(window).on( 'scroll', function(){
    //console.log('Event Fired');
    scrollPosition = $(window).scrollTop();
    fixMenuMegafono();
});

function heightTitulo() {
    hTitulo = $('.cont_megafono .banner .col .titulo').outerHeight();
    $('.cont_megafono .banner .col .buscador').css('height', hTitulo);
}

function fixMenuMegafono(){

   /* console.log('offsetTop ' +  offsetTop);

    console.log('padding left ' + menuPaddingL);

    console.log('menuW' + menuWajustado);*/

    if(!isMobile()) {
        if (scrollPosition > offsetTop - 50) {
            //console.log('aqui jue');
            menuMega.css({
                'position': 'fixed',
                'left': offsetLeft,
                'width': menuWajustado,
                'margin-top': 0,
                'padding-left': menuPaddingL,
                'padding-right': menuPaddingL

            });
        }else {
            menuMega.css({
                'position': 'relative',
                'width': '90%',
                'left': 'inherit',
                'margin-top': '85px',
                'padding': '0 5%'
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