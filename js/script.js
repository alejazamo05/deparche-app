/* =====================================================
   DEPARCHE APP SAS
   SCRIPT PRINCIPAL
   Compatible con URLs limpias mediante carpetas

   Estructura:

   /
   /contacto/
   /nosotros/
   /portafolio/

===================================================== */

"use strict";


/* =====================================================
   INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    inicializarMenuMovil();

    inicializarAnimaciones();

    inicializarFormularioContacto();

    inicializarEnlacesInternos();

});


/* =====================================================
   1. MENÚ MÓVIL
===================================================== */

function inicializarMenuMovil() {

    const botonMenu =
        document.getElementById("menuMobile");

    const menuMovil =
        document.getElementById("menuMobileContent");


    /*
       Si la página no tiene menú móvil,
       simplemente no hacemos nada.
    */

    if (!botonMenu || !menuMovil) {
        return;
    }


    /* =================================================
       ABRIR / CERRAR MENÚ
    ================================================= */

    botonMenu.addEventListener("click", function () {

        const estaAbierto =
            menuMovil.classList.contains("active");


        menuMovil.classList.toggle(
            "active"
        );


        botonMenu.setAttribute(
            "aria-expanded",
            String(!estaAbierto)
        );


        botonMenu.setAttribute(
            "aria-label",
            estaAbierto
                ? "Abrir menú"
                : "Cerrar menú"
        );


        /*
           Cambiamos visualmente el icono
        */

        botonMenu.textContent =
            estaAbierto
                ? "☰"
                : "✕";

    });


    /* =================================================
       CERRAR AL HACER CLICK EN UN ENLACE
    ================================================= */

    const enlaces =
        menuMovil.querySelectorAll("a");


    enlaces.forEach(function (enlace) {

        enlace.addEventListener(
            "click",
            function () {

                menuMovil.classList.remove(
                    "active"
                );


                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );


                botonMenu.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                botonMenu.textContent = "☰";

            }
        );

    });


    /* =================================================
       CERRAR AL HACER CLICK FUERA
    ================================================= */

    document.addEventListener(
        "click",
        function (evento) {

            const hizoClickDentroDelMenu =
                menuMovil.contains(evento.target);

            const hizoClickEnBoton =
                botonMenu.contains(evento.target);


            if (
                !hizoClickDentroDelMenu &&
                !hizoClickEnBoton
            ) {

                menuMovil.classList.remove(
                    "active"
                );


                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );


                botonMenu.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                botonMenu.textContent = "☰";

            }

        }
    );


    /* =================================================
       ESC PARA CERRAR
    ================================================= */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                menuMovil.classList.contains("active")
            ) {

                menuMovil.classList.remove(
                    "active"
                );


                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );


                botonMenu.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                botonMenu.textContent = "☰";

            }

        }
    );

}


/* =====================================================
   2. ANIMACIONES AL HACER SCROLL
===================================================== */

function inicializarAnimaciones() {

    const elementos =
        document.querySelectorAll(
            ".animar-scroll, " +
            ".animar-izquierda, " +
            ".animar-derecha, " +
            ".animar-escala"
        );


    /*
       Si la página no tiene elementos animados,
       no hacemos nada.
    */

    if (!elementos.length) {
        return;
    }


    /* =================================================
       RESPETAR ACCESIBILIDAD
    ================================================= */

    const reducirMovimiento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducirMovimiento) {

        elementos.forEach(
            function (elemento) {

                elemento.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    /* =================================================
       INTERSECTION OBSERVER
    ================================================= */

    if (
        "IntersectionObserver" in window
    ) {

        const observador =
            new IntersectionObserver(

                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15,

                    rootMargin:
                        "0px 0px -50px 0px"

                }

            );


        elementos.forEach(
            function (elemento) {

                observador.observe(
                    elemento
                );

            }
        );

    }

    /*
       Fallback para navegadores que no
       soporten IntersectionObserver.
    */

    else {

        elementos.forEach(
            function (elemento) {

                elemento.classList.add(
                    "visible"
                );

            }
        );

    }

}


/* =====================================================
   3. FORMULARIO DE CONTACTO
===================================================== */

function inicializarFormularioContacto() {

    const formulario =
        document.getElementById(
            "formularioContacto"
        );


    /*
       Solo existe en contacto/index.html.
    */

    if (!formulario) {
        return;
    }


    const botonEnviar =
        document.getElementById(
            "botonEnviar"
        );


    const textoBoton =
        document.getElementById(
            "textoBoton"
        );


    const mensajeFormulario =
        document.getElementById(
            "mensajeFormulario"
        );


    /* =================================================
       ENVÍO
    ================================================= */

    formulario.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            /* =============================================
               VALIDACIÓN
            ============================================= */

            const nombre =
                document.getElementById(
                    "nombre"
                );


            const email =
                document.getElementById(
                    "email"
                );


            const servicio =
                document.getElementById(
                    "servicio"
                );


            if (!nombre || !email || !servicio) {
                return;
            }


            const nombreValor =
                nombre.value.trim();


            const emailValor =
                email.value.trim();


            const servicioValor =
                servicio.value.trim();


            /* =============================================
               LIMPIAR ESTADO ANTERIOR
            ============================================= */

            mostrarEstadoFormulario(
                mensajeFormulario,
                "",
                ""
            );


            limpiarErroresFormulario(
                formulario
            );


            /* =============================================
               NOMBRE
            ============================================= */

            if (!nombreValor) {

                mostrarErrorCampo(
                    nombre,
                    "Por favor, escribe tu nombre."
                );

                nombre.focus();

                return;

            }


            /* =============================================
               CORREO
            ============================================= */

            if (!emailValor) {

                mostrarErrorCampo(
                    email,
                    "Por favor, escribe tu correo electrónico."
                );

                email.focus();

                return;

            }


            if (
                !validarEmail(emailValor)
            ) {

                mostrarErrorCampo(
                    email,
                    "Por favor, escribe un correo electrónico válido."
                );

                email.focus();

                return;

            }


            /* =============================================
               SERVICIO
            ============================================= */

            if (!servicioValor) {

                mostrarErrorCampo(
                    servicio,
                    "Por favor, selecciona un servicio."
                );

                servicio.focus();

                return;

            }


            /* =============================================
               BOTÓN CARGANDO
            ============================================= */

            if (botonEnviar) {

                botonEnviar.disabled = true;

            }


            if (textoBoton) {

                textoBoton.textContent =
                    "ENVIANDO...";

            }


            mostrarEstadoFormulario(
                mensajeFormulario,
                "Estamos enviando tu solicitud...",
                "cargando"
            );


            /* =============================================
               DATOS DEL FORMULARIO
            ============================================= */

            const datos =
                new FormData(formulario);


            /*
               Web3Forms utiliza esta dirección
               como endpoint.
            */

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


                /* =========================================
                   ENVÍO EXITOSO
                ========================================= */

                if (
                    respuesta.ok &&
                    resultado.success
                ) {

                    mostrarEstadoFormulario(
                        mensajeFormulario,
                        "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.",
                        "exito"
                    );


                    formulario.reset();


                    /*
                       Después del envío dejamos
                       el botón disponible nuevamente.
                    */

                    if (botonEnviar) {

                        botonEnviar.disabled =
                            false;

                    }


                    if (textoBoton) {

                        textoBoton.textContent =
                            "SOLICITUD ENVIADA";

                    }


                    /*
                       Después de unos segundos
                       restauramos el texto.
                    */

                    setTimeout(
                        function () {

                            if (textoBoton) {

                                textoBoton.textContent =
                                    "ENVIAR SOLICITUD";

                            }

                        },
                        4000
                    );

                }


                /* =========================================
                   ERROR DE WEB3FORMS
                ========================================= */

                else {

                    throw new Error(
                        resultado.message ||
                        "No fue posible enviar el formulario."
                    );

                }

            }

            catch (error) {

                console.error(
                    "Error al enviar formulario:",
                    error
                );


                mostrarEstadoFormulario(
                    mensajeFormulario,
                    "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos directamente por correo o WhatsApp.",
                    "error"
                );


                if (botonEnviar) {

                    botonEnviar.disabled =
                        false;

                }


                if (textoBoton) {

                    textoBoton.textContent =
                        "ENVIAR SOLICITUD";

                }

            }

        }
    );


    /* =================================================
       VALIDACIÓN EN TIEMPO REAL
    ================================================= */

    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach(
        function (campo) {

            campo.addEventListener(
                "input",
                function () {

                    quitarErrorCampo(
                        campo
                    );

                }
            );


            campo.addEventListener(
                "change",
                function () {

                    quitarErrorCampo(
                        campo
                    );

                }
            );

        }
    );

}


/* =====================================================
   4. VALIDAR CORREO
===================================================== */

function validarEmail(email) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return expresion.test(email);

}


/* =====================================================
   5. MOSTRAR ERROR DE CAMPO
===================================================== */

function mostrarErrorCampo(
    campo,
    mensaje
) {

    if (!campo) {
        return;
    }


    campo.style.borderColor =
        "#D9534F";


    campo.style.boxShadow =
        "0 0 0 3px rgba(217, 83, 79, 0.10)";


    /*
       Buscamos un mensaje existente
       asociado al campo.
    */

    let mensajeError =
        campo.parentElement.querySelector(
            ".mensaje-error-campo"
        );


    /*
       Si no existe, lo creamos.
    */

    if (!mensajeError) {

        mensajeError =
            document.createElement(
                "small"
            );


        mensajeError.className =
            "mensaje-error-campo";


        mensajeError.style.display =
            "block";


        mensajeError.style.marginTop =
            "5px";


        mensajeError.style.color =
            "#D9534F";


        mensajeError.style.fontSize =
            "10px";


        mensajeError.style.fontWeight =
            "600";


        campo.parentElement.appendChild(
            mensajeError
        );

    }


    mensajeError.textContent =
        mensaje;

}


/* =====================================================
   6. QUITAR ERROR DE CAMPO
===================================================== */

function quitarErrorCampo(campo) {

    if (!campo) {
        return;
    }


    campo.style.borderColor =
        "";


    campo.style.boxShadow =
        "";


    const mensajeError =
        campo.parentElement.querySelector(
            ".mensaje-error-campo"
        );


    if (mensajeError) {

        mensajeError.remove();

    }

}


/* =====================================================
   7. LIMPIAR TODOS LOS ERRORES
===================================================== */

function limpiarErroresFormulario(
    formulario
) {

    if (!formulario) {
        return;
    }


    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach(
        function (campo) {

            quitarErrorCampo(
                campo
            );

        }
    );

}


/* =====================================================
   8. MENSAJE DEL FORMULARIO
===================================================== */

function mostrarEstadoFormulario(
    elemento,
    mensaje,
    tipo
) {

    if (!elemento) {
        return;
    }


    elemento.textContent =
        mensaje;


    /*
       Limpiamos estilos anteriores
    */

    elemento.style.color = "";


    if (tipo === "exito") {

        elemento.style.color =
            "#248A4A";

    }


    if (tipo === "error") {

        elemento.style.color =
            "#D9534F";

    }


    if (tipo === "cargando") {

        elemento.style.color =
            "#9032BB";

    }

}


/* =====================================================
   9. ENLACES INTERNOS
===================================================== */

function inicializarEnlacesInternos() {

    const enlaces =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    if (!enlaces.length) {
        return;
    }


    enlaces.forEach(
        function (enlace) {

            enlace.addEventListener(
                "click",
                function (evento) {

                    const destino =
                        enlace.getAttribute(
                            "href"
                        );


                    /*
                       Si es solamente "#",
                       no hacemos nada.
                    */

                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        evento.preventDefault();

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    /*
                       Si el elemento existe,
                       hacemos desplazamiento suave.
                    */

                    if (elemento) {

                        evento.preventDefault();


                        elemento.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }

                }
            );

        }
    );

}


/* =====================================================
   10. DETECTAR PÁGINA ACTUAL
===================================================== */

function obtenerPaginaActual() {

    const ruta =
        window.location.pathname;


    /*
       Página principal
    */

    if (
        ruta === "/" ||
        ruta === ""
    ) {

        return "inicio";

    }


    /*
       Contacto
    */

    if (
        ruta.startsWith(
            "/contacto"
        )
    ) {

        return "contacto";

    }


    /*
       Nosotros
    */

    if (
        ruta.startsWith(
            "/nosotros"
        )
    ) {

        return "nosotros";

    }


    /*
       Portafolio
    */

    if (
        ruta.startsWith(
            "/portafolio"
        )
    ) {

        return "portafolio";

    }


    return "";

}


/* =====================================================
   11. MARCAR ENLACE ACTIVO
===================================================== */

function marcarEnlaceActivo() {

    const pagina =
        obtenerPaginaActual();


    if (!pagina) {
        return;
    }


    const enlaces =
        document.querySelectorAll(
            ".menu a, .menu-mobile-content a"
        );


    enlaces.forEach(
        function (enlace) {

            enlace.classList.remove(
                "activo"
            );


            const href =
                enlace.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            let corresponde = false;


            if (
                pagina === "inicio" &&
                (
                    href === "/" ||
                    href === "/#servicios"
                )
            ) {

                corresponde =
                    href === "/";

            }


            if (
                pagina === "contacto" &&
                href === "/contacto/"
            ) {

                corresponde = true;

            }


            if (
                pagina === "nosotros" &&
                href === "/nosotros/"
            ) {

                corresponde = true;

            }


            if (
                pagina === "portafolio" &&
                href === "/portafolio/"
            ) {

                corresponde = true;

            }


            if (corresponde) {

                enlace.classList.add(
                    "activo"
                );

            }

        }
    );

}


/* =====================================================
   12. EJECUTAR ENLACE ACTIVO
===================================================== */

marcarEnlaceActivo();


/* =====================================================
   FIN DEL SCRIPT
===================================================== */
