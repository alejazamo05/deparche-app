
(function () {
    "use strict";

    function iniciarCookies() {
        const banner = document.getElementById("cookieBanner");
        const aceptar = document.getElementById("aceptarCookies");
        const rechazar = document.getElementById("rechazarCookies");

        if (!banner || !aceptar || !rechazar) {
            console.error("DEPARCHE: No se encontró el banner o alguno de sus botones.");
            return;
        }

        const CLAVE = "deparcheCookiesPreferencia";
        const GA_ID = "G-V4Z0LSDWHV";
        const ADS_ID = "AW-18487593882";

        function guardar(valor) {
            try {
                localStorage.setItem(CLAVE, valor);
                return true;
            } catch (error) {
                console.error("No se pudo guardar la preferencia.", error);
                return false;
            }
        }

        function mostrar() {
            banner.classList.remove("oculto");
            banner.setAttribute("aria-hidden", "false");
        }

        function ocultar() {
            banner.classList.add("oculto");
            banner.setAttribute("aria-hidden", "true");
        }

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        function activarGoogle() {
            if (window.deparcheGoogleCargado) return;
            window.deparcheGoogleCargado = true;

            window.gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted"
            });

            window.gtag("js", new Date());
            window.gtag("config", GA_ID);
            window.gtag("config", ADS_ID);

            const script = document.createElement("script");
            script.async = true;
            script.src =
                "https://www.googletagmanager.com/gtag/js?id=" +
                encodeURIComponent(GA_ID);

            script.onerror = function () {
                console.error("No se pudo cargar Google Analytics.");
            };

            document.head.appendChild(script);
        }

        aceptar.addEventListener("click", function (evento) {
            evento.preventDefault();

            if (!guardar("aceptadas")) return;

            activarGoogle();
            ocultar();
        });

        rechazar.addEventListener("click", function (evento) {
            evento.preventDefault();

            if (!guardar("rechazadas")) return;

            window.gtag("consent", "update", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });

            ocultar();
        });

        let preferencia = null;

        try {
            preferencia = localStorage.getItem(CLAVE);
        } catch (error) {
            console.warn("El navegador no permite leer las preferencias.");
        }

        if (preferencia === "aceptadas") {
            activarGoogle();
            ocultar();
        } else if (preferencia === "rechazadas") {
            ocultar();
        } else {
            mostrar();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCookies);
    } else {
        iniciarCookies();
    }
})();
