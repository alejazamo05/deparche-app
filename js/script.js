/* =====================================================
   DEPARCHE APP SAS
   JAVASCRIPT
===================================================== */


/* =====================================================
   MENÚ MÓVIL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuMobile =
        document.getElementById("menuMobile");

    const menuMobileContent =
        document.getElementById("menuMobileContent");


    if (menuMobile && menuMobileContent) {

        menuMobile.addEventListener("click", function () {

            menuMobileContent.classList.toggle("active");

        });


        const enlacesMenu =
            menuMobileContent.querySelectorAll("a");


        enlacesMenu.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                menuMobileContent.classList.remove("active");

            });

        });

    }



    /* =================================================
       FORMULARIO DE CONTACTO
    ================================================= */

    const formulario =
        document.getElementById("formularioContacto");


    if (formulario) {

        formulario.addEventListener("submit", function (event) {

            event.preventDefault();


            const nombre =
                document.getElementById("nombre").value.trim();


            const empresa =
                document.getElementById("empresa").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const telefono =
                document.getElementById("telefono").value.trim();


            const servicio =
                document.getElementById("servicio").value;


            const mensaje =
                document.getElementById("mensaje").value.trim();



            const asunto =
                "SOLICITUD DE SERVICIO - DEPARCHE APP SAS";


            const cuerpo =
                "NUEVA SOLICITUD DE CONTACTO%0D%0A" +
                "%0D%0A" +

                "NOMBRE: " +
                encodeURIComponent(nombre) +
                "%0D%0A" +

                "EMPRESA: " +
                encodeURIComponent(empresa) +
                "%0D%0A" +

                "CORREO: " +
                encodeURIComponent(email) +
                "%0D%0A" +

                "TELÉFONO: " +
                encodeURIComponent(telefono) +
                "%0D%0A" +

                "SERVICIO: " +
                encodeURIComponent(servicio) +
                "%0D%0A" +

                "MENSAJE:%0D%0A" +
                encodeURIComponent(mensaje) +
                "%0D%0A";



            const enlaceCorreo =
                "mailto:commercial@deparchesas.com" +
                "?subject=" +
                encodeURIComponent(asunto) +
                "&body=" +
                cuerpo;


            window.location.href = enlaceCorreo;

        });

    }

});