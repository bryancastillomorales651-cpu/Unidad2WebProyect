
const botonesFiltro = document.querySelectorAll(".btn-filtro");
const productos = document.querySelectorAll(".producto");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const filtro = boton.getAttribute("data-filtro");

    
    botonesFiltro.forEach(function (b) {
      b.classList.remove("active");
    });
    boton.classList.add("active");

    
    productos.forEach(function (producto) {
      if (filtro == "todos" || producto.getAttribute("data-tipo") == filtro) {
        producto.classList.remove("d-none");
      } else {
        producto.classList.add("d-none");
      }
    });
  });
});


const botonesFavorito = document.querySelectorAll(".btn-favorito");

botonesFavorito.forEach(function (boton) {
  const nombre = boton.getAttribute("data-nombre");

  
  if (localStorage.getItem(nombre) == "favorito") {
    boton.classList.add("activo");
  }

  boton.addEventListener("click", function () {
    boton.classList.toggle("activo");

    if (boton.classList.contains("activo")) {
      localStorage.setItem(nombre, "favorito");
    } else {
      localStorage.removeItem(nombre);
    }
  });
});

// contacto
const formulario = document.querySelector("#formulario");

if (formulario) {
  const campos = formulario.querySelectorAll(".form-control, .form-select");
  const resultado = document.querySelector("#resultado");

  
  function revisar(campo) {
    if (campo.checkValidity()) {
      campo.classList.remove("is-invalid");
      campo.classList.add("is-valid");
    } else {
      campo.classList.remove("is-valid");
      campo.classList.add("is-invalid");
    }
  }

  
  campos.forEach(function (campo) {
    campo.addEventListener("input", function () {
      revisar(campo);
    });
  });

  
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // evita que la página se recargue

    campos.forEach(revisar);

    if (formulario.checkValidity() == false) {
      resultado.classList.add("d-none");
      Swal.fire({
        icon: "error",
        title: "Revisa el formulario",
        text: "Hay campos con errores.",
        confirmButtonColor: "#1B2A6B"
      });
      return;
    }

    
    const nombre = document.querySelector("#nombre").value;
    const fecha = document.querySelector("#fecha").value;
    resultado.textContent = "Gracias " + nombre + ", recibimos tu solicitud para el " + fecha + ".";
    resultado.classList.remove("d-none");

    Swal.fire({
      icon: "success",
      title: "¡Solicitud enviada!",
      text: "Te contactaremos pronto.",
      confirmButtonColor: "#1B2A6B"
    });

    
    formulario.reset();
    campos.forEach(function (campo) {
      campo.classList.remove("is-valid");
      campo.classList.remove("is-invalid");
    });
  });
}

// scroll
AOS.init();
