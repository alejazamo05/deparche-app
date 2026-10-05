```javascript
/* =====================================================
   DEPARCHE APP SAS
   JAVASCRIPT GENERAL
===================================================== */


/* =====================================================
   ESPERAR A QUE CARGUE EL DOCUMENTO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       WHATSAPP
    ================================================= */

    const WHATSAPP_URL =
        "https://wa.me/573133514030";


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

    }



    /* =================================================
       BOTONES HABLEMOS / WHATSAPP
    ================================================= */

    const botonesWhatsApp =
        document.querySelectorAll(
            ".boton-whatsapp, " +
            "#botonContactanos, " +
            "#botonContactanosHeader, " +
            "#botonContactanosMobile"
        );


    botonesWhatsApp.forEach(function (boton) {

        boton.addEventListener("click", function (event) {

            event.preventDefault();


            window.open(
                WHATSAPP_URL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });



    /* =================================================
       BOTÓN HABLEMOS DEL HEADER
       
       Funciona con:
       .boton-nav
       
       Solamente si el texto es HABLEMOS.
    ================================================= */

    const botonesHeader =
        document.querySelectorAll(
            ".boton-nav"
        );


    botonesHeader.forEach(function (boton) {

        const texto =
            boton.textContent
                .trim()
                .toUpperCase();


        if (texto === "HABLEMOS") {

            boton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    window.open(
                        WHATSAPP_URL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        }

    });



    /* =================================================
       MODAL CONTACTO - NOSOTROS
    ================================================= */

    const modalContacto =
        document.getElementById(
            "modalContacto"
        );


    const cerrarModalContacto =
        document.getElementById(
            "cerrarModalContacto"
        );


    const botonContactanos =
        document.getElementById(
            "botonContactanos"
        );


    /* =================================================
       FUNCIÓN ABRIR MODAL
    ================================================= */

    function abrirModalContacto() {

        if (!modalContacto) {

            return;

        }


        modalContacto.classList.add(
            "active"
        );


        modalContacto.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        const nombre =
            document.getElementById(
                "nombreNosotros"
            );


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


        modalContacto.classList.remove(
            "active"
        );


        modalContacto.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


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
       NOSOTROS.HTML
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
       BOTÓN CERRAR MODAL
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
       CERRAR MODAL AL HACER CLICK AFUERA
    ================================================= */

    if (modalContacto) {

        modalContacto.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modalContacto
                ) {

                    cerrarModal();

                }

            }
        );

    }



    /* =================================================
       CERRAR MODAL CON ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modalContacto &&
                modalContacto.classList.contains(
                    "active"
                )
            ) {

                cerrarModal();

            }

        }
    );



    /* =================================================
       FUNCIÓN GENERAL WEB3FORMS
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


            if (!response.ok) {

                throw new Error(
                    "Error HTTP: " +
                    response.status
                );

            }


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
       ENLACES INTERNOS
    ================================================= */

    /*
     * Los enlaces que llevan a contacto.html
     * permanecen funcionando normalmente.
     */

});
```
