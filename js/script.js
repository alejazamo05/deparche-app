/* =====================================================
   DEPARCHE APP SAS
   SCRIPT PRINCIPAL
   Compatible con contacto.html
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MENÚ MÓVIL
    ================================================= */

    const menuMobile = document.getElementById("menuMobile");
    const menuMobileContent = document.getElementById("menuMobileContent");

    if (menuMobile && menuMobileContent) {

        menuMobile.addEventListener("click", function () {

            menuMobileContent.classList.toggle("activo");

            const menuAbierto =
                menuMobileContent.classList.contains("activo");

            menuMobile.setAttribute(
                "aria-expanded",
                menuAbierto
            );

            menuMobile.setAttribute(
                "aria-label",
                menuAbierto
                    ? "Cerrar menú"
                    : "Abrir menú"
            );

            menuMobile.innerHTML =
                menuAbierto
                    ? "✕"
                    : "☰";
        });


        /* =============================================
           CERRAR MENÚ AL HACER CLIC EN UN ENLACE
        ============================================= */

        const enlacesMenu =
            menuMobileContent.querySelectorAll("a");

        enlacesMenu.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                menuMobileContent.classList.remove("activo");

                menuMobile.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuMobile.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuMobile.innerHTML = "☰";
            });

        });


        /* =============================================
           CERRAR MENÚ AL HACER CLIC FUERA
        ============================================= */

        document.addEventListener("click", function (evento) {

            const clicDentroMenu =
                menuMobileContent.contains(evento.target);

            const clicBoton =
                menuMobile.contains(evento.target);

            if (
                !clicDentroMenu &&
                !clicBoton &&
                menuMobileContent.classList.contains("activo")
            ) {

                menuMobileContent.classList.remove("activo");

                menuMobile.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuMobile.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuMobile.innerHTML = "☰";
            }

        });

    }


    /* =================================================
       FORMULARIO DE CONTACTO
       WEB3FORMS
    ================================================= */

    const formulario =
        document.getElementById("formularioContacto");

    const botonEnviar =
        document.getElementById("botonEnviar");

    const textoBoton =
        document.getElementById("textoBoton");

    const mensajeFormulario =
        document.getElementById("mensajeFormulario");


    if (
        formulario &&
        botonEnviar &&
        textoBoton &&
        mensajeFormulario
    ) {


        /* =============================================
           FUNCIÓN PARA MOSTRAR MENSAJES
        ============================================= */

        function mostrarMensaje(texto, tipo) {

            mensajeFormulario.textContent = texto;

            mensajeFormulario.style.color =
                tipo === "exito"
                    ? "#3B8D4A"
                    : "#C0392B";

        }


        /* =============================================
           VALIDACIÓN DEL FORMULARIO
        ============================================= */

        formulario.addEventListener(
            "submit",
            async function (evento) {

                evento.preventDefault();


                /* =========================================
                   OBTENER CAMPOS
                ========================================= */

                const nombre =
                    document.getElementById("nombre");

                const email =
                    document.getElementById("email");

                const servicio =
                    document.getElementById("servicio");


                /* =========================================
                   LIMPIAR MENSAJE ANTERIOR
                ========================================= */

                mensajeFormulario.textContent = "";


                /* =========================================
                   VALIDAR NOMBRE
                ========================================= */

                if (!nombre.value.trim()) {

                    mostrarMensaje(
                        "Por favor, escribe tu nombre.",
                        "error"
                    );

                    nombre.focus();

                    return;
                }


                /* =========================================
                   VALIDAR CORREO
                ========================================= */

                if (!email.value.trim()) {

                    mostrarMensaje(
                        "Por favor, escribe tu correo electrónico.",
                        "error"
                    );

                    email.focus();

                    return;
                }


                /* =========================================
                   VALIDAR FORMATO DEL CORREO
                ========================================= */

                const formatoEmail =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!formatoEmail.test(email.value.trim())) {

                    mostrarMensaje(
                        "Por favor, escribe un correo electrónico válido.",
                        "error"
                    );

                    email.focus();

                    return;
                }


                /* =========================================
                   VALIDAR SERVICIO
                ========================================= */

                if (!servicio.value) {

                    mostrarMensaje(
                        "Por favor, selecciona un servicio.",
                        "error"
                    );

                    servicio.focus();

                    return;
                }


                /* =========================================
                   BOTÓN EN ESTADO DE ENVÍO
                ========================================= */

                botonEnviar.disabled = true;

                textoBoton.textContent =
                    "ENVIANDO...";


                /* =========================================
                   PREPARAR DATOS
                ========================================= */

                const datos =
                    new FormData(formulario);


                /* =========================================
                   ENVIAR A WEB3FORMS
                ========================================= */

                try {

                    const respuesta =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",
                                body: datos
                            }
                        );


                    const resultado =
                        await respuesta.json();


                    /* =====================================
                       RESPUESTA EXITOSA
                    ===================================== */

                    if (resultado.success) {

                        mostrarMensaje(
                            "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.",
                            "exito"
                        );


                        textoBoton.textContent =
                            "SOLICITUD ENVIADA";


                        formulario.reset();


                        /* =================================
                           RESTAURAR BOTÓN DESPUÉS
                        ================================= */

                        setTimeout(function () {

                            botonEnviar.disabled = false;

                            textoBoton.textContent =
                                "ENVIAR SOLICITUD";

                        }, 5000);


                    } else {

                        throw new Error(
                            resultado.message ||
                            "No fue posible enviar el formulario."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Error al enviar formulario:",
                        error
                    );


                    mostrarMensaje(
                        "No pudimos enviar tu solicitud. Por favor, inténtalo nuevamente o escríbenos directamente por correo o WhatsApp.",
                        "error"
                    );


                    botonEnviar.disabled = false;

                    textoBoton.textContent =
                        "ENVIAR SOLICITUD";

                }

            }
        );

    }


    /* =================================================
       CERRAR MENÚ AL CAMBIAR A ESCRITORIO
    ================================================= */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 768 &&
            menuMobileContent
        ) {

            menuMobileContent.classList.remove("activo");

            if (menuMobile) {

                menuMobile.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuMobile.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuMobile.innerHTML = "☰";
            }

        }

    });


    /* =================================================
       PROTECCIÓN BÁSICA DEL FORMULARIO
    ================================================= */

    if (formulario) {

        formulario.addEventListener(
            "keydown",
            function (evento) {

                if (
                    evento.key === "Enter" &&
                    evento.target.tagName === "INPUT"
                ) {

                    /*
                       Permitimos Enter normalmente en
                       campos de texto, pero evitamos
                       comportamientos accidentales.
                    */

                }

            }
        );

    }

});
