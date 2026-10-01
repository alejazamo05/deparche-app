/* =====================================================
   DEPARCHE APP SAS
   JAVASCRIPT PRINCIPAL - INDEX
   ESPAÑOL + INGLÉS
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       IDIOMA ACTUAL
    ===================================================== */

    const idioma =
        document.documentElement.lang === "en"
            ? "en"
            : "es";


    /* =====================================================
       TEXTOS
    ===================================================== */

    const textos = {

        es: {

            enviando:
                "ENVIANDO...",

            enviado:
                "ENVIADO ✓",

            solicitudEnviada:
                "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.",

            errorEnvio:
                "No pudimos enviar tu solicitud. Inténtalo nuevamente.",

            intentarNuevamente:
                "INTENTAR NUEVAMENTE",

            noSePudoEnviar:
                "No se pudo enviar el formulario."

        },


        en: {

            enviando:
                "SENDING...",

            enviado:
                "SENT ✓",

            solicitudEnviada:
                "Request sent successfully! We will contact you soon.",

            errorEnvio:
                "We could not send your request. Please try again.",

            intentarNuevamente:
                "TRY AGAIN",

            noSePudoEnviar:
                "The form could not be submitted."

        }

    };


    const t = textos[idioma];



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuMobile =
        document.getElementById("menuMobile");


    const menuMobileContent =
        document.getElementById("menuMobileContent");


    if (
        menuMobile &&
        menuMobileContent
    ) {


        menuMobile.addEventListener(
            "click",
            function () {


                const activo =
                    menuMobileContent.classList.toggle(
                        "active"
                    );


                menuMobile.setAttribute(
                    "aria-expanded",
                    activo ? "true" : "false"
                );


            }
        );


        const enlacesMenu =
            menuMobileContent.querySelectorAll("a");


        enlacesMenu.forEach(
            function (enlace) {


                enlace.addEventListener(
                    "click",
                    function () {


                        menuMobileContent.classList.remove(
                            "active"
                        );


                        menuMobile.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                    }
                );


            }
        );


    }



    /* =====================================================
       ELEMENTOS DEL SELECTOR DE CONTACTO
    ===================================================== */

    const selector =
        document.getElementById(
            "contactoSelectorInicio"
        );


    const botonHero =
        document.getElementById(
            "botonHablemosHero"
        );


    const botonContactarnos =
        document.getElementById(
            "botonContactarnosInicio"
        );


    const cerrarSelector =
        document.getElementById(
            "cerrarSelectorInicio"
        );


    const opcionCorreo =
        document.getElementById(
            "opcionCorreoInicio"
        );



    /* =====================================================
       ELEMENTOS DEL MODAL
    ===================================================== */

    const modal =
        document.getElementById(
            "modalInicio"
        );


    const cerrarModal =
        document.getElementById(
            "cerrarModalInicio"
        );


    const formulario =
        document.getElementById(
            "formularioContactoInicio"
        );


    const botonEnviar =
        document.getElementById(
            "botonEnviarInicio"
        );


    const textoBoton =
        document.getElementById(
            "textoBotonInicio"
        );


    const mensajeFormulario =
        document.getElementById(
            "mensajeFormularioInicio"
        );



    /* =====================================================
       ABRIR SELECTOR DE CONTACTO
    ===================================================== */

    function abrirSelectorContacto() {


        if (!selector) {
            return;
        }


        selector.classList.add(
            "active"
        );


        selector.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


    }



    /* =====================================================
       CERRAR SELECTOR DE CONTACTO
    ===================================================== */

    function cerrarSelectorContacto() {


        if (!selector) {
            return;
        }


        selector.classList.remove(
            "active"
        );


        selector.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            !modal ||
            !modal.classList.contains("active")
        ) {

            document.body.style.overflow =
                "";

        }


    }



    /* =====================================================
       ABRIR MODAL DE CONTACTO
    ===================================================== */

    function abrirModalInicio() {


        cerrarSelectorContacto();


        if (!modal) {
            return;
        }


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        const nombre =
            document.getElementById(
                "nombreInicio"
            );


        if (nombre) {

            setTimeout(
                function () {

                    nombre.focus();

                },
                200
            );

        }


    }



    /* =====================================================
       CERRAR MODAL DE CONTACTO
    ===================================================== */

    function cerrarModalInicio() {


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        if (formulario) {

            formulario.reset();

        }


        if (mensajeFormulario) {

            mensajeFormulario.textContent =
                "";

            mensajeFormulario.style.color =
                "";

        }


        if (textoBoton) {

            textoBoton.textContent =
                idioma === "en"
                    ? "SEND REQUEST"
                    : "ENVIAR SOLICITUD";

        }


        if (botonEnviar) {

            botonEnviar.disabled =
                false;

        }


    }



    /* =====================================================
       BOTÓN HABLEMOS DEL HERO
    ===================================================== */

    if (botonHero) {

        botonHero.addEventListener(
            "click",
            function () {

                abrirSelectorContacto();

            }
        );

    }



    /* =====================================================
       BOTÓN CONTACTARNOS DEL CTA
    ===================================================== */

    if (botonContactarnos) {

        botonContactarnos.addEventListener(
            "click",
            function () {

                abrirSelectorContacto();

            }
        );

    }



    /* =====================================================
       OPCIÓN CORREO
    ===================================================== */

    if (opcionCorreo) {

        opcionCorreo.addEventListener(
            "click",
            function () {

                abrirModalInicio();

            }
        );

    }



    /* =====================================================
       CERRAR SELECTOR
    ===================================================== */

    if (cerrarSelector) {

        cerrarSelector.addEventListener(
            "click",
            function () {

                cerrarSelectorContacto();

            }
        );

    }



    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    if (cerrarModal) {

        cerrarModal.addEventListener(
            "click",
            function () {

                cerrarModalInicio();

            }
        );

    }



    /* =====================================================
       CERRAR SELECTOR AL HACER CLICK FUERA
    ===================================================== */

    if (selector) {

        selector.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === selector
                ) {

                    cerrarSelectorContacto();

                }


            }
        );

    }



    /* =====================================================
       CERRAR MODAL AL HACER CLICK FUERA
    ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === modal
                ) {

                    cerrarModalInicio();

                }


            }
        );

    }



    /* =====================================================
       CERRAR CON ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key !== "Escape"
            ) {

                return;

            }


            if (
                modal &&
                modal.classList.contains("active")
            ) {

                cerrarModalInicio();

                return;

            }


            if (
                selector &&
                selector.classList.contains("active")
            ) {

                cerrarSelectorContacto();

            }


        }
    );



    /* =====================================================
       ENVÍO DEL FORMULARIO - WEB3FORMS
    ===================================================== */

    if (formulario) {


        formulario.addEventListener(
            "submit",
            async function (event) {


                event.preventDefault();


                if (
                    !botonEnviar ||
                    !textoBoton ||
                    !mensajeFormulario
                ) {

                    return;

                }


                /* -----------------------------------------
                   DESACTIVAR BOTÓN
                ----------------------------------------- */

                botonEnviar.disabled =
                    true;


                textoBoton.textContent =
                    t.enviando;


                mensajeFormulario.textContent =
                    "";


                mensajeFormulario.style.color =
                    "";



                try {


                    /* -------------------------------------
                       CREAR DATOS DEL FORMULARIO
                    ------------------------------------- */

                    const formData =
                        new FormData(
                            formulario
                        );



                    /* -------------------------------------
                       ENVIAR A WEB3FORMS
                    ------------------------------------- */

                    const response =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",
                                body: formData
                            }
                        );



                    /* -------------------------------------
                       VERIFICAR RESPUESTA
                    ------------------------------------- */

                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            "Error HTTP: " +
                            response.status
                        );

                    }



                    const data =
                        await response.json();



                    /* -------------------------------------
                       FORMULARIO ENVIADO
                    ------------------------------------- */

                    if (
                        data.success
                    ) {


                        mensajeFormulario.textContent =
                            t.solicitudEnviada;


                        mensajeFormulario.style.color =
                            "#238636";


                        textoBoton.textContent =
                            t.enviado;


                        formulario.reset();



                        /* -----------------------------
                           CERRAR MODAL
                        ----------------------------- */

                        setTimeout(
                            function () {

                                cerrarModalInicio();

                            },
                            3000
                        );


                    }


                    /* -------------------------------------
                       ERROR REPORTADO POR WEB3FORMS
                    ------------------------------------- */

                    else {


                        throw new Error(
                            data.message ||
                            t.noSePudoEnviar
                        );


                    }


                } catch (error) {


                    console.error(
                        "Error Web3Forms:",
                        error
                    );


                    mensajeFormulario.textContent =
                        t.errorEnvio;


                    mensajeFormulario.style.color =
                        "#c62828";


                    textoBoton.textContent =
                        t.intentarNuevamente;


                } finally {


                    botonEnviar.disabled =
                        false;


                }


            }
        );


    }



    /* =====================================================
       ANIMACIONES DE APARICIÓN AL HACER SCROLL
    ===================================================== */

    const elementosReveal =
        document.querySelectorAll(
            ".scroll-reveal, " +
            ".scroll-reveal-left, " +
            ".scroll-reveal-right, " +
            ".scroll-scale"
        );



    if (
        elementosReveal.length > 0
    ) {


        /* -----------------------------------------
           NAVEGADORES CON INTERSECTION OBSERVER
        ----------------------------------------- */

        if (
            "IntersectionObserver" in window
        ) {


            const observer =
                new IntersectionObserver(
                    function (
                        entries
                    ) {


                        entries.forEach(
                            function (
                                entry
                            ) {


                                if (
                                    entry.isIntersecting
                                ) {


                                    entry.target.classList.add(
                                        "visible"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );


                                }


                            }
                        );


                    },
                    {
                        threshold: 0.12,

                        rootMargin:
                            "0px 0px -50px 0px"
                    }
                );



            elementosReveal.forEach(
                function (
                    elemento
                ) {


                    observer.observe(
                        elemento
                    );


                }
            );


        }


        /* -----------------------------------------
           NAVEGADORES SIN INTERSECTION OBSERVER
        ----------------------------------------- */

        else {


            elementosReveal.forEach(
                function (
                    elemento
                ) {


                    elemento.classList.add(
                        "visible"
                    );


                }
            );


        }


    }



    /* =====================================================
       COOKIES
    ===================================================== */

    const cookieBanner =
        document.getElementById(
            "cookieBanner"
        );


    const aceptarCookies =
        document.getElementById(
            "aceptarCookies"
        );


    const cookiesAceptadas =
        localStorage.getItem(
            "deparcheCookiesAceptadas"
        );



    /* =====================================================
       COMPROBAR SI YA ACEPTÓ
    ===================================================== */

    if (
        cookiesAceptadas === "true"
    ) {


        if (cookieBanner) {

            cookieBanner.classList.add(
                "oculto"
            );

        }


    }



    /* =====================================================
       BOTÓN ACEPTAR COOKIES
    ===================================================== */

    if (aceptarCookies) {


        aceptarCookies.addEventListener(
            "click",
            function () {


                localStorage.setItem(
                    "deparcheCookiesAceptadas",
                    "true"
                );


                if (cookieBanner) {

                    cookieBanner.classList.add(
                        "oculto"
                    );

                }


            }
        );


    }



    /* =====================================================
       PREVENIR SCROLL DEL BODY CON MODALES ABIERTOS
       AL CAMBIAR DE TAMAÑO DE PANTALLA
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {


            const selectorActivo =
                selector &&
                selector.classList.contains(
                    "active"
                );


            const modalActivo =
                modal &&
                modal.classList.contains(
                    "active"
                );


            if (
                selectorActivo ||
                modalActivo
            ) {

                document.body.style.overflow =
                    "hidden";

            }


        }
    );



    /* =====================================================
       FIN
    ===================================================== */

});
