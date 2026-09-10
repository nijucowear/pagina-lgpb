$raiz = '';
if(window.location.href.indexOf("app_dev.html") > -1) {
    $raiz = 'app_dev.html';
}


var firebaseConfig = {
    apiKey: "AIzaSyCtF5Kw0p3M17NE8wcYIYT_fhLQYsghNfY",
    authDomain: "andrescr-4f2ec.firebaseapp.com",
    databaseURL: "https://andrescr-4f2ec-default-rtdb.firebaseio.com",
    projectId: "andrescr-4f2ec",
    storageBucket: "andrescr-4f2ec.appspot.com",
    messagingSenderId: "105330488616",
    appId: "1:105330488616:web:d15579061f8e89de388c1d",
    measurementId: "G-DCVSD5QKZH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



$(function () {

    console.log('ini fire');
    if(window.location.href.includes('iniciar-sesion') || window.location.href.includes('olvide') || window.location.href.includes('registrarme')) {
        initApp();
    }

    $('#crear').click(function () {
        $('.cont').toggle("slow");
    });

    $('#anterior').change(function () {
        if($(this).val() != 0){
            window.location = $(this).val();
        }
    })
    /*$("#cart").on("click", function(e) {
        e.preventDefault();
        $(".shopping-cart").fadeToggle( "fast");
    });*/

    $('#anterior').change(function () {
        if($(this).val() != 0){
            window.location = $(this).val();
        }
    })
    $('.cerrar_sesion,#cerrar-sesion').click(function (e) {
        console.log("cerrar sesion");
        e.preventDefault();
        firebase.auth().signOut();
        window.location = $raiz+'/logout';
    });
    $(".usuario-tool").click(function(){
        if($(this).hasClass("menu-open")){
            $(this).removeClass("menu-open");
        } else {
            $(this).addClass("menu-open");
        }
    });
    $(".menu-mobile").click(function(){
        if($(this).hasClass("menu-open-dos")){
            $(this).removeClass("menu-open-dos");
            $(".menue").removeClass("menu-open-dos");
        } else {
            $(this).addClass("menu-open-dos");
            $(".menue").addClass("menu-open-dos");
        }
    });
  /*  $.ajax({
        url: "/ajax-cart",
        type: 'get',
        dataType: "html",
        success: function( html ) {
            $('#cart-items').html(html);
            //fbq('track', 'AddToCart');
        }
    });*/
});

function setLatLng(latLng) {
    $('#lat').val(latLng.lat());
    $('#lng').val(latLng.lng());
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {

    showLoader();
    $('#errores').hide();
    var nombre = document.getElementById('nombre').value;
   // var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var documento = document.getElementById('documento').value;
    var telefono = document.getElementById('telefono').value;
    var ciudad = document.getElementById('ciudad').value;
    var direccion = document.getElementById('direccion').value;
    var password = document.getElementById('password').value;
    var password_second = document.getElementById('password_second').value;
    if (nombre.length < 2 && nombre.trim()==null || nombre.trim()=="" || nombre===" ") {
        setError('Ingresa tu nombre');
        return;
    }
    if (!(/^[A-Za-zÑÁÉÍÓÚ ñáéíóú ]+$/.test(nombre))){
        setError('El nombre solo debe contener letras');
        return;
    }
  /*  if (apellido.length < 3 || apellido.trim()==null || apellido.trim()=="" || apellido===" ") {
        setError('Ingresa tu apellido');
        return;
    }*/
    if (documento.length < 3 || documento.trim()==null || documento.trim()=="" || documento===" ") {
        setError('Ingresa tu documento');
        return;
    }
    if (telefono.length < 10 || telefono.trim()==null || telefono.trim()=="" || telefono===" " ) {
        setError('Ingresa tu telefono');
        return;
    }

    if (!/^([0-9])*$/.test(telefono)){
        setError('El teléfono solo dee contener números');
        return;
    }
    if (email.length < 4 || email.trim()==null || email.trim()=="" || email===" ") {
        setError('Ingresa tu email');
        return;
    }
    if (ciudad.length < 1 || ciudad.trim()==null || ciudad.trim()=="" || ciudad===" ") {
        setError('Ingresa tu ciudad');
        return;
    }
    if (direccion.length < 1 || direccion.trim()==null || direccion.trim()=="" || direccion===" ") {
        setError('Ingresa tu dirección');
        return;
    }

     if (password.length < 6 || password.trim()==null || password.trim()=="" || password===" ") {
        setError('Ingresa una contraseña');
        return;
    }
    if (password != password_second) {
        setError('Las contraseñas deben coincidir');
        return;
    }
    if (!$('#terminos').is(':checked')){
        setError('Debe aceptar los terminos');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            setError('La contraseña debe tener al menos 6 caracteres');
        }else if("auth/email-already-in-use") {
            setError('El email ya se encuentra registrado');
        } else if (errorCode=='auth/invalid-email') {
            setError('Email incorrecto');
        }else {
            setError(errorMessage);
        }
        console.log(error);
    });
}
/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    console.log('entro');
    showLoader();
    $('#errores').hide();
    if (firebase.auth().currentUser) {
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            setError('Ingresa tu email');
            return;
        }
        if (password.length < 4) {
            setError('Ingresa tu contraseña');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                setError('Contraseña incorrecta');
            } else if (errorCode=='auth/invalid-email') {
                setError('Email incorrecto');
            }else if (errorCode=='auth/user-not-found') {
                setError('El usuario no se encuentra registrado');
            }else{

                setError(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
        });
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function sendPasswordReset() {
    showLoader();
    $('#errores').hide();
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        $('#success').show();
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            setError('Email incorrecto');
        } else if (errorCode == 'auth/user-not-found') {
            setError('Usuario no encontrado');
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}

function setError(mensaje) {
    $('.loader-wrapper').hide();
    $('#errores').show().html(mensaje);
    window.scrollTo(0, 0);
}

function showLoader() {
    $('.loader-wrapper').show();
}


function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
            var user_up = {};
            if($('#nombre').length > 0){
                var nombre = document.getElementById('nombre').value;
                user_up.nombre = nombre;
            }
            if($('#telefono').length > 0){
                var telefono = document.getElementById('telefono').value;
                user_up.telefono = telefono;
            }
            if($('#documento').length > 0){
                var documento = document.getElementById('documento').value;
                user_up.documento = documento;
            }
            if($('#indicativo').length > 0){
                var indicativo = document.getElementById('indicativo').value;
                user_up.documento = indicativo;
            }
            if($('#telefono').length > 0){
                var telefono = document.getElementById('telefono').value;
                user_up.documento = telefono;
            }
            if($('#ciudad').length > 0){
                var ciudad = document.getElementById('ciudad').value;
                user_up.ciudad = ciudad;
            }
            if($('#direccion').length > 0){
                var direccion = document.getElementById('direccion').value;
                user_up.direccion = direccion;
            }
            if($('#lat').length > 0){
                var lat = document.getElementById('lat').value;
                user_up.lat = lat;
            }
            if($('#lng').length > 0){
                var lng = document.getElementById('lng').value;
                user_up.lng = lng;
            }
            if($('#adicional').length > 0){
                var adicional = document.getElementById('adicional').value;
                user_up.adicional = adicional;
            }

            user_up.email = email;
            user_up.uid = uid;
            user_up.providerData = providerData;
            //user_up.telefono = user.telefono;
            console.log(user);
            console.log("user_up",user_up);

            $.ajax({
                type: "POST",
                url:  $raiz+"/auth/register",
                // The key needs to match your method's input parameter (case-sensitive).
                data: JSON.stringify(user_up),
                cocntentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    console.log(data);
                    window.location = data.url;
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });


        } else {
        }
    });


    if($('#quickstart-sign-in').length > 0)
       document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    if($('#quickstart-sign-up').length > 0)
        document.getElementById('quickstart-sign-up').addEventListener('click', vefificarDir, false);
    //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    if($('#quickstart-password-reset').length > 0){
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
}



$(".inumber-decrement").click(function(){
    var id=$(this).data('id');
     var actual = $(this).next().html();
    if(actual > 1)
        actual--;
    $(this).next().html(actual);
    $('.cant-'+id).html(actual);
})

$(".inumber-increment").click(function(){
    var id=$(this).data('id');
    var actual = $(this).prev().html();
    actual++;
    $(this).prev().html(actual);
    $('.cant-'+id).html(actual);
})



$(document).ready(function(){

    /* $(".agregado-carrito").on( "click", function() {
        console.log('poup agregado');
    });

    setTimeout(function() {
        $( ".agregado-carrito" ).trigger( "click" );    
    }, 10000); */

    var inst = $('#modalAgregado').remodal();
    

    $(".agregar").click(function(){
        var cantidad = $("#cant_"+$(this).data('id')).html();
         var producto =  $(this).data('id');
         var wish = 0;
     
         console.log('agregando');
     
         if(cantidad > 0){
     
                 console.log('cantidad mayor a 0');
     
                 $('.loader-wrapper').show();
     
                 $.ajax({
                     method: "POST",
                     url: $raiz+'/add-to-carrito',
                     contentType: "application/json",
                     accept: "application/json",
                     dataType: "json",
                     data: JSON.stringify({cantidad: cantidad, producto: producto, wish: wish})
                 })
                     .done(function (msg) {
                        /* gtag('event', 'add_to_cart', {
                             "items": [{
                                 "id": ""+producto
                             }]
                         });
                     */
                        if (msg.ok && wish == "") {
                            $("#badge_carrito").html(msg.carrito);
                             //showToast('agregado');
                             inst.open();
                            $('.mod_almacen .close').click(function(){
                                inst.close();
                            });
                         } else {
                             showToast(msg.mensaje);
                         }
                     });
     
         }else{
             showToast('la cantidad tiene que ser mayor a cero');
         }
     
     })
});


function vefificarDir(){

    var dir = $("#direccion").val()+$("#adicional").val() +" ,"+$("#ciudad option:selected").html();;
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBuBfixcvfxmRdACJEiyb3tqw8PeCjM8I&address=' + dir;
    $.get(url, function(resp){
        console.log('respuesta de geocode', resp);
        if (resp.status == 'OK') {
            let data = resp.results[0];
            map.setCenter({lat: data.geometry.location.lat, lng: data.geometry.location.lng});
            miMarker.setPosition({lat: data.geometry.location.lat, lng: data.geometry.location.lng});
            $("#lat").val(data.geometry.location.lat);
            $("#lng").val(data.geometry.location.lng);

        } else {
            //alert( resp.error_message);
            //showToast();
        }
        handleSignUp();

    });

}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
$('#aceptar-cookies').click(function(){
    localStorage.setItem('cookies',1);
    $("#cookies").hide();
})
var vcookies = localStorage.getItem('cookies');


console.log('muestra vcookies' , vcookies);
if(vcookies === null || vcookies === undefined){
    $("#cookies").show();
}else {
    $("#cookies").hide();
}


function showToast(msg = '') {
    var x = document.getElementById("snackbar");
    x.innerText = msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3500);
}


