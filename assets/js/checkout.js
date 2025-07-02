document.addEventListener("DOMContentLoaded", () => {
  const pasos = document.querySelectorAll(".paso-barra");
  const secciones = document.querySelectorAll(".paso-contenido");
  let pasoActual = 1;

  // Función para mostrar el paso actual
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

  // Paso 4: Finalizar pedido
  const formPaso4 = document.getElementById("form-paso-4");
  formPaso4.addEventListener("submit", (e) => {
    e.preventDefault();
    // alert("formulario enviado"); // prueba
    if (formPaso4.checkValidity()) {
      Swal.fire({
        icon: "success",
        title: "¡Pedido realizado! 🎉",
        text: "Gracias por tu compra. En breve recibirás un correo con los detalles del envío.",
        confirmButtonText: "OK",
      }).then(() => {
        localStorage.removeItem("carrito");
        window.location.href = "/index.html";
      });
    } else {
      formPaso4.reportValidity();
    }
  });

  // Opción de continuar como invitado
  document.querySelector(".btn-invitado")?.addEventListener("click", () => {
    mostrarPaso(2);
  });
});

// LLENADO DE PROVINCIAS Y CANTONES EN SELECTS
fetch("../assets/data/provincias.json")
  .then((res) => res.json())
  .then((data) => {
    const selProvincia = document.getElementById("provincia");
    const selCanton = document.getElementById("canton");

    // Agrega las provincias al <select>
    data.provincias.forEach((prov) => {
      const opt = document.createElement("option");
      opt.value = prov.nombre;
      opt.textContent = prov.nombre;
      selProvincia.appendChild(opt);
    });

    // Agrega cantones al cambiar de provincia
    selProvincia.addEventListener("change", () => {
      const provinciaSeleccionada = data.provincias.find(
        (p) => p.nombre === selProvincia.value
      );

      selCanton.innerHTML = '<option value="">Seleccione un cantón</option>';

      if (provinciaSeleccionada) {
        provinciaSeleccionada.cantones.forEach((canton) => {
          const opt = document.createElement("option");
          opt.value = canton;
          opt.textContent = canton;
          selCanton.appendChild(opt);
        });
      }
    });
  });
