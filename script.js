let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// 👉 AGREGAR RESERVA
function agregarReserva(propiedad, cliente, monto) {

  let comision = monto * 0.25;
  let limpieza = 50;
  let pagoDueno = monto * 0.75;

  let reserva = {
    propiedad,
    cliente,
    monto,
    comision,
    limpieza,
    pagoDueno
  };

  reservas.push(reserva);

  // Guardar en memoria del navegador
  localStorage.setItem("reservas", JSON.stringify(reservas));

  actualizarDashboard();
}

// 👉 ACTUALIZAR PANEL
function actualizarDashboard() {

  // Reservas
  document.querySelectorAll(".card p")[2].innerText = reservas.length;

  // Dinero ganado (comisión + limpieza)
  let total = 0;

  reservas.forEach(r => {
    total += r.comision + r.limpieza;
  });

  document.querySelector(".monto").innerText = "$" + total.toFixed(2) + " USD";
}

// 👉 CARGAR DATOS AL INICIAR
function cargarDatos() {
  actualizarDashboard();
}

// 👉 BORRAR TODO (opcional)
function limpiarDatos() {
  localStorage.removeItem("reservas");
  reservas = [];
  actualizarDashboard();
  alert("Datos borrados");
}

// Ejecutar al abrir
cargarDatos();