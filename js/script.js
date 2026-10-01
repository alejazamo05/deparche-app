/* =====================================================
   DEPARCHE APP SAS
   SCRIPT.JS
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
       ANIMACIONES
    ================================================= */

    const elementos =
        document.querySelectorAll(
            ".animar-scroll, .animar-izquierda, .animar-derecha, .animar-escala"
        );


    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(function (entradas) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visible");

                    }

                });

            }, {
                threshold: 0.15
            });


        elementos.forEach(function (elemento) {

            observador.observe(elemento);

        });

    } else {

        elementos.forEach(function (elemento) {

            elemento.classList.add("visible");

        });

    }


    /* =================================================
       FORMULARIO CONTACTO
    ================================================= */

    const formulario =
        document.getElementById("formularioContacto");


    if (!formulario) {
        return;
    }


    const boton =
        document.getElementById("botonEnviar");

    const textoBoton =
        document.getElementById("textoBoton");

    const mensaje =
        document.getElementById("mensajeFormulario");


    formulario.addEventListener("submit", async function (evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById("nombre");

        const email =
            document.getElementById("email");

        const servicio =
            document.getElementById("servicio");


        /* VALIDACIÓN */

        if (!nombre.value.trim()) {

            mensaje.textContent =
                "Por favor, escribe tu nombre.";

            mensaje.style.color =
                "#D9534F";

            nombre.focus();

            return;

        }


        if (!email.value.trim()) {

            mensaje.textContent =
                "Por favor, escribe tu correo.";

            mensaje.style.color =
                "#D9534F";

            email.focus();

            return;

        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.value.trim()
            )
        ) {

            mensaje.textContent =
                "Escribe un correo electrónico válido.";

            mensaje.style.color =
                "#D9534F";

            email.focus();

            return;

        }


        if (!servicio.value) {

            mensaje.textContent =
                "Selecciona un servicio.";

            mensaje.style.color =
                "#D9534F";

            servicio.focus();

            return;

        }


        /* ENVIANDO */

        boton.disabled = true;

        textoBoton.textContent =
            "ENVIANDO...";

        mensaje.textContent =
            "Enviando tu solicitud...";

        mensaje.style.color =
            "#9032BB";


        try {

            const respuesta =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: new FormData(formulario)
                    }
                );


            const resultado =
                await respuesta.json();


            if (resultado.success) {

                formulario.reset();

                mensaje.textContent =
                    "¡Solicitud enviada correctamente! Nos pondremos en contacto contigo.";

                mensaje.style.color =
                    "#248A4A";

                textoBoton.textContent =
                    "SOLICITUD ENVIADA";


                setTimeout(function () {

                    boton.disabled = false;

                    textoBoton.textContent =
                        "ENVIAR SOLICITUD";

                    mensaje.textContent = "";

                }, 4000);


            } else {

                throw new Error();

            }


        } catch (error) {

            console.error(error);

            mensaje.textContent =
                "No pudimos enviar la solicitud. Inténtalo nuevamente.";

            mensaje.style.color =
                "#D9534F";

            boton.disabled = false;

            textoBoton.textContent =
                "ENVIAR SOLICITUD";

        }

    });

});
