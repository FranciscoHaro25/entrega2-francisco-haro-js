document.addEventListener("DOMContentLoaded", () => {
  const pasos = document.querySelectorAll(".paso-barra");
  const secciones = document.querySelectorAll(".paso-contenido");
  let pasoActual = 1;

  const mostrarPaso = (numero) => {
    secciones.forEach((section, index) => {
      section.classList.toggle("visible", index === numero - 1);
      section.classList.toggle("oculto", index !== numero - 1);
    });

    pasos.forEach((li, index) => {
      li.classList.toggle("activo", index === numero - 1);
    });

    pasoActual = numero;
  };

  // Mostrar/ocultar contraseña
  const btnMostrar = document.getElementById("mostrar-password");
  const inputPass = document.getElementById("password");
  if (btnMostrar && inputPass) {
    btnMostrar.addEventListener("click", () => {
      const tipo =
        inputPass.getAttribute("type") === "password" ? "text" : "password";
      inputPass.setAttribute("type", tipo);
      btnMostrar.textContent = tipo === "password" ? "MOSTRAR" : "OCULTAR";
    });
  }

  // Validaciones y navegación paso a paso
  const avanzarPaso = (formId, siguientePaso) => {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        mostrarPaso(siguientePaso);
      } else {
        form.reportValidity();
      }
    });
  };

  avanzarPaso("form-paso-1", 2);
  avanzarPaso("form-paso-2", 3);
  avanzarPaso("form-paso-3", 4);

  // Finalizar pedido con SweetAlert personalizado
  const formPaso4 = document.getElementById("form-paso-4");
  if (formPaso4) {
    formPaso4.addEventListener("submit", (e) => {
      e.preventDefault();

      if (formPaso4.checkValidity()) {
        Swal.fire({
          icon: "success",
          title: "¡Pedido realizado! 🎉",
          html: `<strong>Gracias por tu compra</strong><br>En breve recibirás un correo con los detalles del envío.`,
          background: "#fff7f0",
          color: "#333",
          iconColor: "#EC6A37",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-popup-gatox",
            title: "swal-title-gatox",
            htmlContainer: "swal-html-gatox",
            confirmButton: "swal-btn-ok-gatox",
          },
        }).then(() => {
          localStorage.removeItem("carrito");
          localStorage.removeItem("resumen");
          window.location.href = "/index.html";
        });
      } else {
        formPaso4.reportValidity();
      }
    });
  }

  // ===============================
  // LLENADO DE PROVINCIAS Y CANTONES
  // ===============================
  fetch("../assets/data/provincias.json")
    .then((res) => res.json())
    .then((data) => {
      const selProvincia = document.getElementById("provincia");
      const selCanton = document.getElementById("canton");
      if (!selProvincia || !selCanton) return;

      const limpiarSelect = (select, placeholder) => {
        select.innerHTML = "";
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = placeholder;
        select.appendChild(opt);
      };

      data.provincias.forEach((prov) => {
        const opt = document.createElement("option");
        opt.value = prov.nombre;
        opt.textContent = prov.nombre;
        selProvincia.appendChild(opt);
      });

      selProvincia.addEventListener("change", () => {
        const provinciaSeleccionada = data.provincias.find(
          (p) => p.nombre === selProvincia.value
        );
        limpiarSelect(selCanton, "Seleccione un cantón");

        if (provinciaSeleccionada) {
          provinciaSeleccionada.cantones.forEach((canton) => {
            const opt = document.createElement("option");
            opt.value = canton;
            opt.textContent = canton;
            selCanton.appendChild(opt);
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar provincias.json:", error);
    });

  // Opción de continuar como invitado
  const btnInvitado = document.querySelector(".btn-invitado");
  if (btnInvitado) {
    btnInvitado.addEventListener("click", () => {
      mostrarPaso(2);
    });
  }

  // ===============================
  // RESUMEN DE CARRITO (DOM desde localStorage)
  // ===============================
  const resumenCantidad = document.getElementById("carrito-resumen-cantidad");
  const resumenSubtotal = document.getElementById("resumen-subtotal");
  const resumenTotal = document.getElementById("resumen-total");
  const resumenDescuento = document.getElementById("resumen-descuento");
  const resumenEnvio = document.getElementById("resumen-envio");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumen = JSON.parse(localStorage.getItem("resumen")) || {};
  const envio = 1.99;
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const descuento = resumen.descuento || 0;
  const total = subtotal + envio - descuento;

  if (resumenCantidad) {
    resumenCantidad.textContent = `Hay ${carrito.length} artículo${
      carrito.length !== 1 ? "s" : ""
    } en su carrito.`;
  }

  if (resumenSubtotal) resumenSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (resumenEnvio) resumenEnvio.textContent = `$${envio.toFixed(2)}`;
  if (resumenDescuento)
    resumenDescuento.textContent = `-$${descuento.toFixed(2)}`;
  if (resumenTotal) resumenTotal.textContent = `$${total.toFixed(2)}`;
});
