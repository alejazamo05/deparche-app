/* =====================================================
   DEPARCHE APP SAS
   JAVASCRIPT GENERAL
===================================================== */


/* =====================================================
   ESPERAR A QUE CARGUE EL DOCUMENTO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       MENÚ MÓVIL
    ================================================= */

    const menuMobile =
        document.getElementById("menuMobile");

    const menuMobileContent =
        document.getElementById("menuMobileContent");


    if (menuMobile && menuMobileContent) {


        menuMobile.addEventListener("click", function () {

            const activo =
                menuMobileContent.classList.toggle("active");


            menuMobile.setAttribute(
                "aria-expanded",
                activo ? "true" : "false"
            );

        });


        const enlacesMenu =
            menuMobileContent.querySelectorAll("a");


        enlacesMenu.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                menuMobileContent.classList.remove("active");

                menuMobile.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* BOTÓN HABLEMOS DEL MENÚ MÓVIL */

        const botonContactanosMobile =
            document.getElementById(
                "botonContactanosMobile"
            );


        if (botonContactanosMobile) {

            botonContactanosMobile.addEventListener(
                "click",
                function () {

                    menuMobileContent.classList.remove(
                        "active"
                    );

                    menuMobile.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    abrirModalContacto();

                }
            );

        }

    }



    /* =================================================
       MODAL CONTACTO - NOSOTROS
    ================================================= */

    const modalContacto =
        document.getElementById("modalContacto");


    const cerrarModalContacto =
        document.getElementById("cerrarModalContacto");


    const botonContactanos =
        document.getElementById("botonContactanos");


    const botonContactanosHeader =
        document.getElementById(
            "botonContactanosHeader"
        );



    /* =================================================
       FUNCIÓN ABRIR MODAL
    ================================================= */

    function abrirModalContacto() {

        if (!modalContacto) {
            return;
        }


        modalContacto.classList.add("active");

        modalContacto.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";


        const nombre =
            document.getElementById("nombreNosotros");


        if (nombre) {

            setTimeout(function () {

                nombre.focus();

            }, 200);

        }

    }



    /* =================================================
       FUNCIÓN CERRAR MODAL
    ================================================= */

    function cerrarModal() {

        if (!modalContacto) {
            return;
        }


        modalContacto.classList.remove("active");

        modalContacto.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";


        const formularioNosotros =
            document.getElementById(
                "formularioContactoNosotros"
            );


        if (formularioNosotros) {

            formularioNosotros.reset();

        }


        const mensaje =
            document.getElementById(
                "mensajeFormularioNosotros"
            );


        if (mensaje) {

            mensaje.textContent = "";

            mensaje.style.color = "";

        }


        const textoBoton =
            document.getElementById(
                "textoBotonNosotros"
            );


        if (textoBoton) {

            textoBoton.textContent =
                "ENVIAR SOLICITUD";

        }

    }



    /* =================================================
       BOTÓN CONTACTANOS DEL CTA
    ================================================= */

    if (botonContactanos) {

        botonContactanos.addEventListener(
            "click",
            function () {

                abrirModalContacto();

            }
        );

    }



    /* =================================================
       BOTÓN HABLEMOS DEL HEADER
    ================================================= */

    if (botonContactanosHeader) {

        botonContactanosHeader.addEventListener(
            "click",
            function () {

                abrirModalContacto();

            }
        );

    }



    /* =================================================
       BOTÓN CERRAR
    ================================================= */

    if (cerrarModalContacto) {

        cerrarModalContacto.addEventListener(
            "click",
            function () {

                cerrarModal();

            }
        );

    }



    /* =================================================
       CERRAR AL HACER CLICK FUERA
    ================================================= */

    if (modalContacto) {

        modalContacto.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modalContacto
                ) {

                    cerrarModal();

                }

            }
        );

    }



    /* =================================================
       CERRAR CON ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modalContacto &&
                modalContacto.classList.contains("active")
            ) {

                cerrarModal();

            }

        }
    );



    /* =================================================
       FUNCIÓN GENERAL PARA WEB3FORMS
    ================================================= */

    async function enviarFormularioWeb3Forms(
        formulario,
        mensajeEstado,
        textoBoton
    ) {


        const boton =
            formulario.querySelector(
                'button[type="submit"]'
            );


        try {


            if (boton) {

                boton.disabled = true;

            }


            if (textoBoton) {

                textoBoton.textContent =
                    "ENVIANDO...";

            }


            if (mensajeEstado) {

                mensajeEstado.textContent = "";

                mensajeEstado.style.color = "";

            }


            const formData =
                new FormData(formulario);


            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (data.success) {


                if (mensajeEstado) {

                    mensajeEstado.textContent =
                        "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.";

                    mensajeEstado.style.color =
                        "#238636";

                }


                if (textoBoton) {

                    textoBoton.textContent =
                        "ENVIADO ✓";

                }


                formulario.reset();


                return true;

            }


            throw new Error(
                data.message ||
                "No se pudo enviar el formulario."
            );


        } catch (error) {


            console.error(
                "Error Web3Forms:",
                error
            );


            if (mensajeEstado) {

                mensajeEstado.textContent =
                    "No pudimos enviar tu solicitud. Inténtalo nuevamente.";

                mensajeEstado.style.color =
                    "#c62828";

            }


            if (textoBoton) {

                textoBoton.textContent =
                    "INTENTAR NUEVAMENTE";

            }


            return false;


        } finally {


            if (boton) {

                boton.disabled = false;

            }

        }

    }



    /* =================================================
       FORMULARIO DE CONTACTO.HTML
    ================================================= */

    const formularioContacto =
        document.getElementById(
            "formularioContacto"
        );


    if (formularioContacto) {


        formularioContacto.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const mensajeEstado =
                    document.getElementById(
                        "mensajeFormulario"
                    );


                const textoBoton =
                    document.getElementById(
                        "textoBoton"
                    );


                const enviado =
                    await enviarFormularioWeb3Forms(
                        formularioContacto,
                        mensajeEstado,
                        textoBoton
                    );


                if (enviado) {

                    setTimeout(
                        function () {

                            if (mensajeEstado) {

                                mensajeEstado.textContent =
                                    "¡Gracias por contactarnos!";

                            }

                        },
                        3000
                    );

                }

            }
        );

    }



    /* =================================================
       FORMULARIO EMERGENTE DE NOSOTROS.HTML
    ================================================= */

    const formularioNosotros =
        document.getElementById(
            "formularioContactoNosotros"
        );


    if (formularioNosotros) {


        formularioNosotros.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const mensajeEstado =
                    document.getElementById(
                        "mensajeFormularioNosotros"
                    );


                const textoBoton =
                    document.getElementById(
                        "textoBotonNosotros"
                    );


                const enviado =
                    await enviarFormularioWeb3Forms(
                        formularioNosotros,
                        mensajeEstado,
                        textoBoton
                    );


                if (enviado) {


                    setTimeout(
                        function () {

                            cerrarModal();

                        },
                        2500
                    );

                }

            }
        );

    }



    /* =================================================
       ENLACES INTERNOS DE CONTACTO
    ================================================= */

    const enlacesContacto =
        document.querySelectorAll(
            'a[href="contacto.html"]'
        );


    enlacesContacto.forEach(
        function (enlace) {

            /*
             * Los enlaces normales siguen llevando
             * a contacto.html.
             *
             * No se modifica su comportamiento.
             */

        }
    );


});
