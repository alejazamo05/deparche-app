/* =====================================================
   DEPARCHE APP SAS
   JAVASCRIPT GENERAL

   MENÚS + MODALES + FORMULARIOS + ANIMACIONES

   El consentimiento de cookies y las etiquetas de Google
   se gestionan por separado en js/cookies.js.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. MENÚS MÓVILES
    ================================================= */

    const posiblesMenus = [
        {
            boton: "menuMobile",
            contenido: "menuMobileContent"
        },
        {
            boton: "menuMobilePortafolio",
            contenido: "menuMobileContentPortafolio"
        }
    ];

    posiblesMenus.forEach(function (menu) {
        const boton = document.getElementById(menu.boton);
        const contenido = document.getElementById(menu.contenido);

        if (!boton || !contenido) return;

        boton.addEventListener("click", function () {
            const activo = contenido.classList.toggle("active");
            boton.setAttribute("aria-expanded", String(activo));
        });

        contenido.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                contenido.classList.remove("active");
                boton.setAttribute("aria-expanded", "false");
            });
        });
    });


    /* =================================================
       2. MODAL DE CONTACTO DE OTRAS PÁGINAS
    ================================================= */

    const modalContacto = document.getElementById("modalContacto");
    const cerrarModalContacto = document.getElementById("cerrarModalContacto");
    const botonContactanos = document.getElementById("botonContactanos");
    const botonContactanosHeader = document.getElementById("botonContactanosHeader");

    function abrirModalContacto() {
        if (!modalContacto) return;

        modalContacto.classList.add("active");
        modalContacto.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const campo = document.getElementById("nombreNosotros");

        if (campo) {
            window.setTimeout(function () {
                campo.focus();
            }, 200);
        }
    }

    function cerrarModalContactoFuncion() {
        if (!modalContacto) return;

        if (modalContacto.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        modalContacto.classList.remove("active");
        modalContacto.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        const formulario = document.getElementById("formularioContactoNosotros");
        const mensaje = document.getElementById("mensajeFormularioNosotros");
        const textoBoton = document.getElementById("textoBotonNosotros");

        if (formulario) formulario.reset();

        if (mensaje) {
            mensaje.textContent = "";
            mensaje.style.color = "";
        }

        if (textoBoton) {
            textoBoton.textContent = "ENVIAR SOLICITUD";
        }
    }

    if (botonContactanos) {
        botonContactanos.addEventListener("click", abrirModalContacto);
    }

    if (botonContactanosHeader) {
        botonContactanosHeader.addEventListener("click", abrirModalContacto);
    }

    if (cerrarModalContacto) {
        cerrarModalContacto.addEventListener(
            "click",
            cerrarModalContactoFuncion
        );
    }

    if (modalContacto) {
        modalContacto.addEventListener("click", function (event) {
            if (event.target === modalContacto) {
                cerrarModalContactoFuncion();
            }
        });
    }


    /* =================================================
       3. SELECTOR Y FORMULARIO DE CONTACTO DEL INICIO
    ================================================= */

    const selector = document.getElementById("contactoSelectorInicio");
    const modalInicio = document.getElementById("modalInicio");

    const botonHero = document.getElementById("botonHablemosHero");
    const botonCTA = document.getElementById("botonContactarnosInicio");

    const cerrarSelector = document.getElementById("cerrarSelectorInicio");
    const opcionCorreo = document.getElementById("opcionCorreoInicio");
    const cerrarModalInicio = document.getElementById("cerrarModalInicio");

    function abrirSelectorContacto() {
        if (!selector) {
            abrirModalInicio();
            return;
        }

        selector.classList.add("active");
        selector.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function cerrarSelectorContacto() {
        if (!selector) return;

        if (selector.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        selector.classList.remove("active");
        selector.setAttribute("aria-hidden", "true");

        if (!modalInicio || !modalInicio.classList.contains("active")) {
            document.body.style.overflow = "";
        }
    }

    function abrirModalInicio() {
        cerrarSelectorContacto();

        if (!modalInicio) return;

        modalInicio.classList.add("active");
        modalInicio.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const campo = document.getElementById("nombreInicio");

        if (campo) {
            window.setTimeout(function () {
                campo.focus();
            }, 200);
        }
    }

    function cerrarModalInicioFuncion() {
        if (!modalInicio) return;

        if (modalInicio.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        modalInicio.classList.remove("active");
        modalInicio.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (botonHero) {
        botonHero.addEventListener("click", abrirSelectorContacto);
    }

    if (botonCTA) {
        botonCTA.addEventListener("click", abrirSelectorContacto);
    }

    if (cerrarSelector) {
        cerrarSelector.addEventListener("click", cerrarSelectorContacto);
    }

    if (opcionCorreo) {
        opcionCorreo.addEventListener("click", abrirModalInicio);
    }

    if (cerrarModalInicio) {
        cerrarModalInicio.addEventListener(
            "click",
            cerrarModalInicioFuncion
        );
    }

    if (selector) {
        selector.addEventListener("click", function (event) {
            if (event.target === selector) {
                cerrarSelectorContacto();
            }
        });
    }

    if (modalInicio) {
        modalInicio.addEventListener("click", function (event) {
            if (event.target === modalInicio) {
                cerrarModalInicioFuncion();
            }
        });
    }

    const botonContactanosMobile = document.getElementById(
        "botonContactanosMobile"
    );

    if (botonContactanosMobile) {
        botonContactanosMobile.addEventListener("click", function () {

            posiblesMenus.forEach(function (menu) {
                const contenido = document.getElementById(menu.contenido);
                const boton = document.getElementById(menu.boton);

                if (contenido) contenido.classList.remove("active");

                if (boton) {
                    boton.setAttribute("aria-expanded", "false");
                }
            });

            if (selector) {
                abrirSelectorContacto();
            } else if (modalInicio) {
                abrirModalInicio();
            } else {
                abrirModalContacto();
            }
        });
    }


    /* =================================================
       4. CERRAR MODALES CON ESCAPE
    ================================================= */

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        cerrarSelectorContacto();
        cerrarModalInicioFuncion();
        cerrarModalContactoFuncion();
    });


    /* =================================================
       5. ENVÍO DE FORMULARIOS WEB3FORMS
    ================================================= */

    async function enviarFormularioWeb3Forms(
        formulario,
        mensajeEstado,
        textoBoton
    ) {
        const boton = formulario.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const textoOriginal = textoBoton
            ? textoBoton.textContent
            : "";

        if (boton) boton.disabled = true;

        if (textoBoton) {
            textoBoton.textContent = "ENVIANDO...";
        }

        if (mensajeEstado) {
            mensajeEstado.textContent = "";
            mensajeEstado.style.color = "";
        }

        try {
            const respuesta = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: new FormData(formulario)
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok || !resultado.success) {
                throw new Error(
                    resultado.message ||
                    "No se pudo enviar el formulario."
                );
            }

            if (mensajeEstado) {
                mensajeEstado.textContent =
                    "¡Solicitud enviada correctamente! " +
                    "Nos pondremos en contacto contigo.";

                mensajeEstado.style.color = "#238636";
            }

            if (textoBoton) {
                textoBoton.textContent = "ENVIADO ✓";
            }

            formulario.reset();

            return true;

        } catch (error) {
            console.error(
                "Error al enviar el formulario:",
                error
            );

            if (mensajeEstado) {
                mensajeEstado.textContent =
                    "No pudimos enviar tu solicitud. " +
                    "Inténtalo nuevamente.";

                mensajeEstado.style.color = "#c62828";
            }

            if (textoBoton) {
                textoBoton.textContent = "INTENTAR NUEVAMENTE";
            }

            return false;

        } finally {
            if (boton) boton.disabled = false;

            if (
                textoBoton &&
                textoBoton.textContent === "ENVIANDO..."
            ) {
                textoBoton.textContent = textoOriginal;
            }
        }
    }

    function conectarFormulario(
        idFormulario,
        idMensaje,
        idTextoBoton,
        alEnviar
    ) {
        const formulario = document.getElementById(idFormulario);

        if (!formulario) return;

        formulario.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            const mensaje = document.getElementById(idMensaje);
            const textoBoton = document.getElementById(idTextoBoton);

            const enviado = await enviarFormularioWeb3Forms(
                formulario,
                mensaje,
                textoBoton
            );

            if (enviado && typeof alEnviar === "function") {
                alEnviar();
            }
        });
    }

    conectarFormulario(
        "formularioContacto",
        "mensajeFormulario",
        "textoBoton"
    );

    conectarFormulario(
        "formularioContactoNosotros",
        "mensajeFormularioNosotros",
        "textoBotonNosotros",
        function () {
            window.setTimeout(
                cerrarModalContactoFuncion,
                2500
            );
        }
    );

    conectarFormulario(
        "formularioContactoInicio",
        "mensajeFormularioInicio",
        "textoBotonInicio",
        function () {
            window.setTimeout(
                cerrarModalInicioFuncion,
                2500
            );
        }
    );


    /* =================================================
       6. ANIMACIONES AL DESPLAZARSE
    ================================================= */

    const elementosAnimados = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-left, " +
        ".scroll-reveal-right, .scroll-scale"
    );

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            function (entradas, observer) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        elementosAnimados.forEach(function (elemento) {
            observador.observe(elemento);
        });

    } else {
        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("visible");
        });
    }

});

/* =====================================================
   COOKIES — DEPARCHE APP SAS
===================================================== */

(function () {
    "use strict";

    function iniciarAvisoCookies() {
        const banner = document.getElementById("cookieBanner");
        const aceptar = document.getElementById("aceptarCookies");
        const rechazar = document.getElementById("rechazarCookies");

        if (!banner || !aceptar || !rechazar) {
            console.error("Cookies: no se encontró el banner o sus botones.");
            return;
        }

        const CLAVE = "deparcheCookiesPreferencia";

        function ocultar() {
            banner.classList.add("oculto");
            banner.setAttribute("aria-hidden", "true");
        }

        function mostrar() {
            banner.classList.remove("oculto");
            banner.setAttribute("aria-hidden", "false");
        }

        function guardar(valor) {
            try {
                localStorage.setItem(CLAVE, valor);
                return true;
            } catch (error) {
                console.error("No se pudo guardar la preferencia:", error);
                alert("No se pudo guardar tu preferencia. Inténtalo de nuevo.");
                return false;
            }
        }

        function aceptarCookies() {
            if (!guardar("aceptadas")) return;

            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function () {
                window.dataLayer.push(arguments);
            };

            window.gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted"
            });

            window.gtag("js", new Date());
            window.gtag("config", "G-V4Z0LSDWHV");
            window.gtag("config", "AW-18487593882");

            if (!window.deparcheGoogleCargado) {
                window.deparcheGoogleCargado = true;

                const script = document.createElement("script");
                script.async = true;
                script.src =
                    "https://www.googletagmanager.com/gtag/js?id=G-V4Z0LSDWHV";

                script.onerror = function () {
                    console.error("No se pudieron cargar las etiquetas de Google.");
                };

                document.head.appendChild(script);
            }

            ocultar();
            console.log("Cookies opcionales aceptadas.");
        }

        function rechazarCookies() {
            if (!guardar("rechazadas")) return;

            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function () {
                window.dataLayer.push(arguments);
            };

            window.gtag("consent", "update", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });

            ocultar();
            console.log("Cookies opcionales rechazadas.");
        }

        aceptar.addEventListener("click", aceptarCookies);
        rechazar.addEventListener("click", rechazarCookies);

        let preferencia = null;

        try {
            preferencia = localStorage.getItem(CLAVE);
        } catch (error) {
            console.warn("No se pudieron leer las preferencias de cookies.");
        }

        if (preferencia === "aceptadas") {
            ocultar();
        } else if (preferencia === "rechazadas") {
            ocultar();
        } else {
            mostrar();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarAvisoCookies);
    } else {
        iniciarAvisoCookies();
    }
})();
