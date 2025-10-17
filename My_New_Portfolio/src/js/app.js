document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
  mostrarLista();
  mostrarModal();
  cerrarModal();
  scrollNav();
  initScrollToTopButton();
  escrituraDinamica();
});

// Varaibles
const menu = document.querySelector("#menu");
const listas = document.querySelectorAll(".habilidades__lista");
const btnDark = document.querySelector("#dark-mode");
const formulario = document.querySelector(".form");
const inputNombre = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputProjecto = document.querySelector("#projecto");
const inputMensaje = document.querySelector("#mensaje");

// eventos

function eventListeners() {
  menu.addEventListener("click", mostrarMenu);
  btnDark.addEventListener("click", modoOscuro);
  inputNombre.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputProjecto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  formulario.addEventListener("submit", enviarMensaje);
}

// objeto que almacena los datos
const datos = {
  nombre: "",
  email: "",
  projecto: "",
  mensaje: "",
};

// Funciones

function enviarMensaje(e) {
  e.preventDefault();
  // limpiarmos el formulario
  resetarFormulario();
  // creamos el mensaje a mostar cuando el formulario este completo
  const formcontainer = document.querySelector(".form");
  const p = document.createElement("p");
  p.classList.add("mensaje-exito");
  p.textContent = "Mensaje Enviado Exitosamente!!!!!";
  formcontainer.appendChild(p);

  //una vez el formulario reseteado entonces el objeto estara vacio y volvemos a llamar esta funcion para que
  // inabilite el boton de enviar
  comprobarEmail();
}
function resetarFormulario() {
  // limpiamos el objeto
  datos.nombre = "";
  datos.email = "";
  datos.projecto = "";
  datos.mensaje = "";

  // limpiamos los imputs
  inputNombre.value = "";
  inputEmail.value = "";
  (inputMensaje.value = ""), (inputProjecto.value = "");
}

function validar(e) {
  e.preventDefault();

  if (e.target.value.trim() === "") {
    mostrarMensajeError("Debes completar este campo", e.target.parentElement);
    datos[e.target.name] = "";
    comprobarEmail();
    return;
  }

  if (e.target.id === "email" && !validarEmail(e.target.value)) {
    mostrarMensajeError("Esto no es un email valido", e.target.parentElement);
    datos[e.target.name] = "";
    comprobarEmail();
    return;
  }
  // una vez la validacion este correcta limpiamos el error
  limpiarError(e.target.parentElement);

  // Una vez que el usuario pase todas las validaciones procedemos a llenar el objeto
  datos[e.target.name] = e.target.value.trim();
  console.log(datos);
  comprobarEmail();
}

function mostrarMensajeError(mensaje, referencia) {
  limpiarError(referencia);
  const texto = document.createElement("p");
  texto.textContent = mensaje;
  texto.classList.add("error");

  referencia.appendChild(texto);
}

function limpiarError(referencia) {
  const error = referencia.querySelector(".error");
  if (error) {
    error.remove();
  }
}

function validarEmail(email) {
  const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
}

function comprobarEmail() {
  const boton = document.querySelector(".form__btn");
  if (Object.values(datos).includes("")) {
    boton.disabled = true;
    boton.classList.remove("activo");
    return;
  }
  boton.disabled = false;
  boton.classList.add("activo");
}

function mostrarMenu() {
  const navegacion = document.querySelector(".navegacion");
  navegacion.classList.toggle("activo");
}
function mostrarLista() {
  const arrows = document.querySelectorAll(".habilidades__arrow");
  arrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      // agregamos la clase active-list a las listas basado en el indice para que se muestren
      listas[index].classList.toggle("active-list");
      // rotamos las flechas cuando damos click
      arrow.classList.toggle("rotate");
    });
  });
}

function mostrarModal() {
  // Abre el modal que corresponde según el data-modal
  document.querySelectorAll(".servicio__texto").forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      const overlay = document.getElementById("modalOverlay");

      // Mostrar el modal y el overlay
      modal.classList.add("modal--active");
      overlay.classList.add("modal-overlay--active");
      document.body.classList.add("modal--open");
    });
  });
}

function cerrarModal() {
  const modales = document.querySelectorAll(".modal");
  modales.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__close")) {
        modal.classList.remove("modal--active");
        document
          .getElementById("modalOverlay")
          .classList.remove("modal-overlay--active");
        document.body.classList.remove("modal--open");
      }
    });
  });
}

function modoOscuro() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
}

function scrollNav() {
  const navLinks = document.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initScrollToTopButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const progressPath = document.getElementById("progressPath");
  const pathLength = progressPath.getTotalLength();

  // Establece los valores iniciales del trazo
  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;

  // Evento de scroll para actualizar el progreso
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;

    if (scroll > 100) {
      scrollTopBtn.classList.remove("hide");
    } else {
      scrollTopBtn.classList.add("hide");
    }
  });

  // Evento para subir al inicio
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function escrituraDinamica(){
    const typed = new Typed('#typed', {
        strings: ['Frontend Developer', 'Web Designer', 'JavaScript Developer'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
};
