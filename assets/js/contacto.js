// Optimización de performance - Variables globales mejoradas
const elementos = {
  formulario: null,
  campos: {
    nombre: null,
    email: null,
    telefono: null,
    asunto: null,
    mensaje: null,
    terminos: null,
  },
  errores: {},
  contadores: {},
};

// Utilidad para debouncing - mejora performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Cache de validaciones para evitar recálculos
const validacionCache = new Map();

// Inicialización optimizada con DOM caching
function inicializarFormulario() {
  // Cache de elementos DOM
  elementos.formulario = document.getElementById("form-contacto");
  elementos.campos.nombre = document.getElementById("nombre");
  elementos.campos.email = document.getElementById("email");
  elementos.campos.telefono = document.getElementById("telefono");
  elementos.campos.asunto = document.getElementById("asunto");
  elementos.campos.mensaje = document.getElementById("mensaje");
  elementos.campos.terminos = document.getElementById("acepto-terminos");

  // Cache de elementos de error
  Object.keys(elementos.campos).forEach((campo) => {
    elementos.errores[campo] = document.getElementById(`error-${campo}`);
  });

  if (!elementos.formulario) return;

  configurarEventListeners();
  configurarAnimaciones();
}

// Funciones de validación optimizadas
const validadores = {
  nombre: (valor) => {
    const cacheKey = `nombre_${valor}`;
    if (validacionCache.has(cacheKey)) {
      return validacionCache.get(cacheKey);
    }

    let resultado = null;
    if (valor.length < 2) {
      resultado = "El nombre debe tener al menos 2 caracteres";
    } else if (valor.length > 50) {
      resultado = "El nombre no puede tener más de 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
      resultado = "El nombre solo puede contener letras y espacios";
    }

    validacionCache.set(cacheKey, resultado);
    return resultado;
  },

  email: (valor) => {
    const cacheKey = `email_${valor}`;
    if (validacionCache.has(cacheKey)) {
      return validacionCache.get(cacheKey);
    }

    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const resultado = !patronEmail.test(valor)
      ? "Por favor ingresa un email válido"
      : null;

    validacionCache.set(cacheKey, resultado);
    return resultado;
  },

  telefono: (valor) => {
    if (!valor || valor.length === 0) return null;

    const cacheKey = `telefono_${valor}`;
    if (validacionCache.has(cacheKey)) {
      return validacionCache.get(cacheKey);
    }

    let resultado = null;
    const patronTelefono = /^[\d\s\-\+\(\)]+$/;
    if (!patronTelefono.test(valor)) {
      resultado =
        "El teléfono solo puede contener números, espacios y símbolos +, -, (, )";
    } else if (valor.replace(/\D/g, "").length < 7) {
      resultado = "El teléfono debe tener al menos 7 dígitos";
    }

    validacionCache.set(cacheKey, resultado);
    return resultado;
  },

  mensaje: (valor) => {
    const cacheKey = `mensaje_${valor.length}`;
    if (validacionCache.has(cacheKey)) {
      return validacionCache.get(cacheKey);
    }

    let resultado = null;
    if (valor.length < 10) {
      resultado = "El mensaje debe tener al menos 10 caracteres";
    } else if (valor.length > 500) {
      resultado = "El mensaje no puede tener más de 500 caracteres";
    }

    validacionCache.set(cacheKey, resultado);
    return resultado;
  },
};

// Gestión optimizada de errores
function gestionarError(campo, mensaje) {
  const errorElemento = elementos.errores[campo];
  if (!errorElemento) return;

  if (mensaje) {
    errorElemento.textContent = mensaje;
    errorElemento.style.display = "block";
    elementos.campos[campo]?.classList.add("invalido");
    elementos.campos[campo]?.classList.remove("valido");
  } else {
    errorElemento.textContent = "";
    errorElemento.style.display = "none";
    elementos.campos[campo]?.classList.remove("invalido");
    elementos.campos[campo]?.classList.add("valido");
  }
}

// Validación en tiempo real con debouncing
const validarCampo = debounce((campo, valor) => {
  const validador = validadores[campo];
  if (validador) {
    const error = validador(valor.trim());
    gestionarError(campo, error);
    return !error;
  }
  return true;
}, 300);

// Contador de caracteres optimizado
function actualizarContador(elemento, max = 500) {
  const actual = elemento.value.length;
  const restantes = max - actual;

  let contador = elementos.contadores[elemento.id];
  if (!contador) {
    contador = document.createElement("span");
    contador.id = `contador-${elemento.id}`;
    contador.className = "contador-caracteres";
    elemento.parentNode.appendChild(contador);
    elementos.contadores[elemento.id] = contador;
  }

  contador.textContent = `${actual}/${max}`;
  contador.style.color = restantes < 50 ? "#e74c3c" : "#b2bec3";
}

// Configuración de event listeners optimizada
function configurarEventListeners() {
  const camposTexto = ["nombre", "email", "telefono", "mensaje"];

  // Eventos blur para validación
  camposTexto.forEach((campo) => {
    const elemento = elementos.campos[campo];
    if (elemento) {
      elemento.addEventListener("blur", () => {
        validarCampo(campo, elemento.value);
      });

      // Input para estado activo
      elemento.addEventListener("focus", () => {
        elemento.parentNode.classList.add("campo-activo");
      });

      elemento.addEventListener("blur", () => {
        if (!elemento.value) {
          elemento.parentNode.classList.remove("campo-activo");
        }
      });
    }
  });

  // Contador para mensaje
  if (elementos.campos.mensaje) {
    elementos.campos.mensaje.addEventListener(
      "input",
      debounce(() => actualizarContador(elementos.campos.mensaje), 100)
    );
  }

  // Submit del formulario
  elementos.formulario.addEventListener("submit", manejarEnvio);
}

// Validación completa del formulario
function validarFormulario() {
  let esValido = true;

  // Limpiar errores previos
  Object.keys(elementos.campos).forEach((campo) => {
    if (campo !== "terminos") {
      gestionarError(campo, null);
    }
  });

  // Validar campos requeridos
  const validaciones = [
    { campo: "nombre", validador: validadores.nombre },
    { campo: "email", validador: validadores.email },
    { campo: "telefono", validador: validadores.telefono },
    { campo: "mensaje", validador: validadores.mensaje },
  ];

  validaciones.forEach(({ campo, validador }) => {
    const elemento = elementos.campos[campo];
    if (elemento && validador) {
      const error = validador(elemento.value.trim());
      if (error) {
        gestionarError(campo, error);
        esValido = false;
      }
    }
  });

  // Validar asunto
  if (!elementos.campos.asunto.value) {
    gestionarError("asunto", "Por favor selecciona un asunto");
    esValido = false;
  }

  // Validar términos
  if (!elementos.campos.terminos.checked) {
    gestionarError("terminos", "Debes aceptar los términos y condiciones");
    esValido = false;
  }

  return esValido;
}

// Simulación de envío optimizada
async function simularEnvio(datos) {
  return new Promise((resolve, reject) => {
    // Simular latencia de red variable
    const latencia = Math.random() * 1000 + 1500;

    setTimeout(() => {
      // Simular posible error (5% de probabilidad)
      if (Math.random() < 0.05) {
        reject(new Error("Error de red simulado"));
      } else {
        console.log("Formulario enviado:", datos);
        resolve(true);
      }
    }, latencia);
  });
}

// Manejo optimizado del envío
async function manejarEnvio(evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    mostrarNotificacion(
      "error",
      "Error en el formulario",
      "Por favor corrige los errores marcados"
    );
    return;
  }

  const botonEnviar = elementos.formulario.querySelector(".btn-enviar");
  const textoOriginal = botonEnviar.innerHTML;

  // Estado de carga
  cambiarEstadoBoton(botonEnviar, true);

  const datosFormulario = recopilarDatos();

  try {
    await simularEnvio(datosFormulario);

    mostrarNotificacion(
      "success",
      "¡Mensaje enviado!",
      "Gracias por contactarnos. Te responderemos pronto."
    );

    limpiarFormulario();
  } catch (error) {
    console.error("Error al enviar:", error);
    mostrarNotificacion(
      "error",
      "Error al enviar",
      "Hubo un problema. Inténtalo de nuevo."
    );
  } finally {
    cambiarEstadoBoton(botonEnviar, false, textoOriginal);
  }
}

// Utilidades auxiliares
function cambiarEstadoBoton(boton, cargando, textoOriginal = null) {
  if (cargando) {
    boton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    boton.disabled = true;
    boton.classList.add("loading");
  } else {
    boton.innerHTML =
      textoOriginal || '<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje';
    boton.disabled = false;
    boton.classList.remove("loading");
  }
}

function recopilarDatos() {
  return {
    nombre: elementos.campos.nombre.value.trim(),
    email: elementos.campos.email.value.trim(),
    telefono: elementos.campos.telefono.value.trim(),
    asunto: elementos.campos.asunto.value,
    mensaje: elementos.campos.mensaje.value.trim(),
    fecha: new Date().toISOString(),
    navegador: navigator.userAgent,
    timestamp: Date.now(),
  };
}

function limpiarFormulario() {
  elementos.formulario.reset();

  // Limpiar estados visuales
  Object.keys(elementos.campos).forEach((campo) => {
    const elemento = elementos.campos[campo];
    if (elemento) {
      elemento.classList.remove("valido", "invalido", "campo-activo");
      elemento.parentNode.classList.remove("campo-activo");
    }
    gestionarError(campo, null);
  });

  // Limpiar contadores
  Object.values(elementos.contadores).forEach((contador) => {
    if (contador && contador.parentNode) {
      contador.parentNode.removeChild(contador);
    }
  });
  elementos.contadores = {};

  // Limpiar cache de validaciones
  validacionCache.clear();
}

function mostrarNotificacion(tipo, titulo, texto) {
  const config = {
    icon: tipo,
    title: titulo,
    text: texto,
    confirmButtonColor: tipo === "success" ? "#27ae60" : "#e74c3c",
    showConfirmButton: true,
    timer: tipo === "success" ? 3000 : null,
    timerProgressBar: tipo === "success",
  };

  Swal.fire(config).then(() => {
    if (tipo === "success") {
      // Focus en el primer campo después del éxito
      elementos.campos.nombre?.focus();
    }
  });
}

// Configuración de animaciones con Intersection Observer para mejor performance
function configurarAnimaciones() {
  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  // Observar campos para animaciones lazy
  document.querySelectorAll(".campo-grupo").forEach((campo) => {
    campo.style.animationPlayState = "paused";
    observer.observe(campo);
  });

  // Animaciones especiales para secciones del formulario
  document.querySelectorAll(".seccion-formulario").forEach((seccion, index) => {
    seccion.style.opacity = "0";
    seccion.style.transform = "translateY(20px)";
    seccion.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      seccion.style.opacity = "1";
      seccion.style.transform = "translateY(0)";
    }, index * 200 + 300);
  });
}

// Inicialización cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarFormulario);
} else {
  inicializarFormulario();
}

// Limpieza al salir de la página
window.addEventListener("beforeunload", () => {
  validacionCache.clear();
});
